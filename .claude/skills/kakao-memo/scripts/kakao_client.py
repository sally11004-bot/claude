"""
Kakao "나에게 보내기(memo/default)" client.

- Reads credentials from env vars or a JSON config file.
- Refreshes the access token automatically using the refresh token.
- Caches the refreshed access token back to the config file so subsequent
  calls within the token lifetime skip the refresh round-trip.

No third-party dependencies: uses only the Python standard library.

Config resolution order (first hit wins):
  1. Environment variables:
       KAKAO_REST_API_KEY   (required for token refresh)
       KAKAO_REFRESH_TOKEN  (required)
       KAKAO_ACCESS_TOKEN   (optional; used until it 401s, then refreshed)
  2. Config file (default: ~/.claude/kakao_config.json), JSON:
       {
         "rest_api_key": "...",
         "refresh_token": "...",
         "access_token": "...",            # optional, managed automatically
         "access_token_expires_at": 0       # optional, unix seconds
       }

The config-file path can be overridden with KAKAO_CONFIG_PATH.
"""

from __future__ import annotations

import json
import os
import time
import urllib.parse
import urllib.request
import urllib.error
from pathlib import Path

KAUTH_HOST = "https://kauth.kakao.com"
KAPI_HOST = "https://kapi.kakao.com"

DEFAULT_CONFIG_PATH = Path(
    os.environ.get("KAKAO_CONFIG_PATH", str(Path.home() / ".claude" / "kakao_config.json"))
)


class KakaoError(RuntimeError):
    """Raised for any Kakao API or configuration failure, with a human message."""


def _http_post(url: str, data: dict, headers: dict | None = None) -> dict:
    body = urllib.parse.urlencode(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw = resp.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", "replace")
        try:
            parsed = json.loads(raw)
        except Exception:
            parsed = {"raw": raw}
        raise KakaoError(f"HTTP {e.code} from {url}: {parsed}") from None
    except urllib.error.URLError as e:
        raise KakaoError(f"Network error calling {url}: {e.reason}") from None


class KakaoClient:
    def __init__(self, config_path: Path = DEFAULT_CONFIG_PATH):
        self.config_path = config_path
        self.cfg = self._load_config()

    # ------------------------------------------------------------------ config
    def _load_config(self) -> dict:
        cfg: dict = {}
        if self.config_path.exists():
            try:
                cfg = json.loads(self.config_path.read_text(encoding="utf-8"))
            except json.JSONDecodeError as e:
                raise KakaoError(f"Config file {self.config_path} is not valid JSON: {e}")
        # Env vars override / fill in
        cfg.setdefault("rest_api_key", os.environ.get("KAKAO_REST_API_KEY", ""))
        cfg.setdefault("refresh_token", os.environ.get("KAKAO_REFRESH_TOKEN", ""))
        if os.environ.get("KAKAO_REST_API_KEY"):
            cfg["rest_api_key"] = os.environ["KAKAO_REST_API_KEY"]
        if os.environ.get("KAKAO_REFRESH_TOKEN"):
            cfg["refresh_token"] = os.environ["KAKAO_REFRESH_TOKEN"]
        if os.environ.get("KAKAO_ACCESS_TOKEN"):
            cfg["access_token"] = os.environ["KAKAO_ACCESS_TOKEN"]
            cfg.setdefault("access_token_expires_at", 0)

        if not cfg.get("refresh_token"):
            raise KakaoError(
                "No refresh token found. Set KAKAO_REFRESH_TOKEN or add "
                f'"refresh_token" to {self.config_path}. '
                "Run get_token.py first to obtain one."
            )
        return cfg

    def _save_config(self) -> None:
        # Only persist to a real file (never clobber if config came purely from env)
        self.config_path.parent.mkdir(parents=True, exist_ok=True)
        # Keep only the fields we manage; preserve anything else already there.
        existing = {}
        if self.config_path.exists():
            try:
                existing = json.loads(self.config_path.read_text(encoding="utf-8"))
            except Exception:
                existing = {}
        existing.update(
            {
                "rest_api_key": self.cfg.get("rest_api_key", ""),
                "refresh_token": self.cfg.get("refresh_token", ""),
                "access_token": self.cfg.get("access_token", ""),
                "access_token_expires_at": self.cfg.get("access_token_expires_at", 0),
            }
        )
        tmp = self.config_path.with_suffix(".tmp")
        tmp.write_text(json.dumps(existing, ensure_ascii=False, indent=2), encoding="utf-8")
        os.replace(tmp, self.config_path)
        try:
            os.chmod(self.config_path, 0o600)
        except OSError:
            pass

    # ------------------------------------------------------------------- token
    def _refresh_access_token(self) -> str:
        if not self.cfg.get("rest_api_key"):
            raise KakaoError(
                "rest_api_key is required to refresh the access token. "
                "Set KAKAO_REST_API_KEY or add it to the config file."
            )
        data = {
            "grant_type": "refresh_token",
            "client_id": self.cfg["rest_api_key"],
            "refresh_token": self.cfg["refresh_token"],
        }
        result = _http_post(f"{KAUTH_HOST}/oauth/token", data)
        access_token = result.get("access_token")
        if not access_token:
            raise KakaoError(f"Token refresh did not return an access_token: {result}")
        self.cfg["access_token"] = access_token
        expires_in = int(result.get("expires_in", 21600))
        # Refresh a minute early to avoid edge-of-expiry 401s.
        self.cfg["access_token_expires_at"] = int(time.time()) + expires_in - 60
        # Kakao only returns a new refresh_token when the old one is near expiry.
        if result.get("refresh_token"):
            self.cfg["refresh_token"] = result["refresh_token"]
        self._save_config()
        return access_token

    def get_access_token(self, force_refresh: bool = False) -> str:
        token = self.cfg.get("access_token")
        expires_at = int(self.cfg.get("access_token_expires_at", 0) or 0)
        if not force_refresh and token and time.time() < expires_at:
            return token
        return self._refresh_access_token()

    # -------------------------------------------------------------------- send
    def send_memo(self, template_object: dict) -> dict:
        """Send a default-template memo to myself. Retries once on 401."""
        url = f"{KAPI_HOST}/v2/api/talk/memo/default/send"
        payload = {"template_object": json.dumps(template_object, ensure_ascii=False)}

        token = self.get_access_token()
        try:
            return _http_post(url, payload, {"Authorization": f"Bearer {token}"})
        except KakaoError as e:
            # Access token likely expired/invalid → force refresh and retry once.
            if "HTTP 401" in str(e):
                token = self.get_access_token(force_refresh=True)
                return _http_post(url, payload, {"Authorization": f"Bearer {token}"})
            raise


# --------------------------------------------------------------------- helpers
def text_template(text: str, link_url: str | None = None, button_title: str | None = None) -> dict:
    """Build a 'text' default template.

    Kakao limits `text` to 200 characters. A link object is required by the
    API; when no URL is given we point it at the Kakao developers page as a
    harmless default so the message still sends.
    """
    if len(text) > 200:
        raise KakaoError(f"text is {len(text)} chars; Kakao 'text' template max is 200.")
    url = link_url or "https://developers.kakao.com"
    template: dict = {
        "object_type": "text",
        "text": text,
        "link": {"web_url": url, "mobile_web_url": url},
    }
    if button_title:
        template["button_title"] = button_title
    return template
