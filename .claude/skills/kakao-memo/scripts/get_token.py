#!/usr/bin/env python3
"""
One-time helper to obtain a Kakao refresh token for "나에게 보내기".

Run this ONCE on your own machine (it needs a browser). It:
  1. Prints the Kakao authorize URL — open it, log in, and consent.
  2. You are redirected to your Redirect URI with ?code=XXXX in the URL bar.
  3. Paste that code here; the script exchanges it for tokens and writes
     ~/.claude/kakao_config.json (rest_api_key + refresh_token + access_token).

Prerequisites (see references/setup.md):
  - A Kakao Developers app with a REST API key.
  - "카카오 로그인" (Kakao Login) activated, a registered Redirect URI, and the
    "talk_message" (카카오톡 메시지 전송) scope enabled with consent set to
    optional/required.

Usage:
    python get_token.py --rest-api-key <KEY> --redirect-uri <URI>

The Redirect URI must exactly match one registered in the app. A common local
value is http://localhost — you do NOT need a running server; just copy the
code out of the address bar after the redirect.
"""

import argparse
import json
import os
import sys
import urllib.parse
import urllib.request
import urllib.error
from pathlib import Path

KAUTH_HOST = "https://kauth.kakao.com"
CONFIG_PATH = Path(
    os.environ.get("KAKAO_CONFIG_PATH", str(Path.home() / ".claude" / "kakao_config.json"))
)


def http_post(url: str, data: dict) -> dict:
    body = urllib.parse.urlencode(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise SystemExit(f"HTTP {e.code}: {e.read().decode('utf-8', 'replace')}")


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--rest-api-key", required=True, help="Kakao app REST API key.")
    p.add_argument("--redirect-uri", required=True, help="A Redirect URI registered on the app.")
    p.add_argument(
        "--scope",
        default="talk_message",
        help="OAuth scopes (default: talk_message).",
    )
    args = p.parse_args()

    authorize_url = f"{KAUTH_HOST}/oauth/authorize?" + urllib.parse.urlencode(
        {
            "client_id": args.rest_api_key,
            "redirect_uri": args.redirect_uri,
            "response_type": "code",
            "scope": args.scope,
        }
    )
    print("\n1) Open this URL in a browser, log in, and consent:\n")
    print(authorize_url)
    print(
        "\n2) After consent you land on your Redirect URI with ?code=... in the\n"
        "   address bar. Copy the code value.\n"
    )
    code = input("3) Paste the authorization code here: ").strip()
    if not code:
        print("No code provided.", file=sys.stderr)
        return 1

    tokens = http_post(
        f"{KAUTH_HOST}/oauth/token",
        {
            "grant_type": "authorization_code",
            "client_id": args.rest_api_key,
            "redirect_uri": args.redirect_uri,
            "code": code,
        },
    )
    if "refresh_token" not in tokens:
        print(f"Token exchange failed: {tokens}", file=sys.stderr)
        return 1

    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    config = {
        "rest_api_key": args.rest_api_key,
        "refresh_token": tokens["refresh_token"],
        "access_token": tokens.get("access_token", ""),
        "access_token_expires_at": 0,
    }
    CONFIG_PATH.write_text(json.dumps(config, ensure_ascii=False, indent=2), encoding="utf-8")
    try:
        os.chmod(CONFIG_PATH, 0o600)
    except OSError:
        pass
    print(f"\n✅ Saved credentials to {CONFIG_PATH}")
    print("   You can now run send_memo.py or use the /kakao command.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
