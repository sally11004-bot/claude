#!/usr/bin/env python3
"""Nate (네이트) 경제뉴스 일간 랭킹 TOP 10을 스크랩해서 Slack으로 전송.

- 대상 페이지: https://news.nate.com/rank/interest?sc=eco&p=day (경제 부문 일간 랭킹)
- 페이지는 EUC-KR 인코딩이므로 디코딩 후 파싱한다.
- Slack Incoming Webhook(Block Kit)으로 전송한다.

환경변수:
    SLACK_WEBHOOK_URL   Slack Incoming Webhook URL (전송 시 필수)

사용법:
    python scripts/nate_econ_news.py            # 실제 전송
    python scripts/nate_econ_news.py --dry-run  # 전송하지 않고 payload만 출력
"""
from __future__ import annotations

import argparse
import json
import logging
import os
import re
import sys
from datetime import datetime, timedelta, timezone

import requests
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# 설정
# ---------------------------------------------------------------------------
NATE_URL = "https://news.nate.com/rank/interest?sc=eco&p=day"
FALLBACK_URL = "https://news.nate.com/rank/"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/125.0 Safari/537.36"
)
REQUEST_TIMEOUT = 15
TOP_N = 10
KST = timezone(timedelta(hours=9))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger("nate_econ_news")


# ---------------------------------------------------------------------------
# 데이터 모델
# ---------------------------------------------------------------------------
class Article:
    __slots__ = ("rank", "title", "url", "press")

    def __init__(self, rank: int, title: str, url: str, press: str = ""):
        self.rank = rank
        self.title = title
        self.url = url
        self.press = press

    def __repr__(self) -> str:  # pragma: no cover - 디버깅용
        return f"Article(rank={self.rank}, title={self.title!r}, press={self.press!r})"


# ---------------------------------------------------------------------------
# 스크래핑
# ---------------------------------------------------------------------------
def fetch_html(url: str) -> str:
    """URL을 가져와 EUC-KR로 디코딩한 HTML 문자열을 반환한다."""
    log.info("페이지 요청: %s", url)
    resp = requests.get(
        url,
        headers={"User-Agent": USER_AGENT, "Referer": "https://news.nate.com/"},
        timeout=REQUEST_TIMEOUT,
    )
    resp.raise_for_status()
    # Nate 는 EUC-KR. 서버가 charset 을 명시하지 않는 경우가 있어 강제 지정.
    resp.encoding = "euc-kr"
    return resp.text


def _absolute_url(href: str) -> str:
    """상대/프로토콜 상대 링크를 절대 URL 로 변환한다."""
    href = href.strip()
    if href.startswith("//"):
        return "https:" + href
    if href.startswith("/"):
        return "https://news.nate.com" + href
    return href


def _clean(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


# 랭킹 리스트 컨테이너로 사용될 수 있는 후보 셀렉터 (변경에 대비한 다중 폴백)
_CONTAINER_SELECTORS = (
    "div.postRankSubjectList",
    "div.mduRankSubject",
    "div.mlt01",
    "div.rankSubjectList",
    "ol.ranklist",
    "ul.ranklist",
)

# 언론사명이 담길 수 있는 후보 셀렉터
_PRESS_SELECTORS = ("span.medium", "span.press", "span.medianame", "cite", "span.medi")

# 기사 상세 링크 패턴
_VIEW_RE = re.compile(r"/view/\d")


def _extract_press(anchor) -> str:
    """앵커 주변에서 언론사명을 최대한 찾아본다."""
    # 앵커 내부
    for sel in _PRESS_SELECTORS:
        node = anchor.select_one(sel)
        if node and _clean(node.get_text()):
            return _clean(node.get_text())
    # 부모(리스트 아이템) 범위
    parent = anchor.find_parent(["li", "div"]) or anchor.parent
    if parent is not None:
        for sel in _PRESS_SELECTORS:
            node = parent.select_one(sel)
            if node and _clean(node.get_text()):
                return _clean(node.get_text())
    return ""


def _extract_title(anchor) -> str:
    """앵커에서 제목 텍스트를 뽑는다 (제목 전용 노드 우선)."""
    for sel in ("strong.tit", "span.tit", ".tit", "strong", "h2", "h3"):
        node = anchor.select_one(sel)
        if node and _clean(node.get_text()):
            return _clean(node.get_text())
    # 이미지 alt 폴백
    img = anchor.select_one("img[alt]")
    if img and _clean(img.get("alt", "")):
        return _clean(img["alt"])
    return _clean(anchor.get_text())


def parse_articles(html: str, top_n: int = TOP_N) -> list[Article]:
    """랭킹 페이지 HTML 에서 상위 top_n 개 기사를 파싱한다.

    전략:
      1) 알려진 컨테이너 셀렉터 안에서 기사 상세(/view/) 링크를 수집한다.
      2) 실패하면 문서 전체에서 /view/ 링크를 문서 순서대로 수집한다.
      3) URL 기준으로 중복 제거 후 상위 top_n 개를 반환한다.
    """
    soup = BeautifulSoup(html, "html.parser")

    anchors = []
    for sel in _CONTAINER_SELECTORS:
        container = soup.select_one(sel)
        if container is None:
            continue
        found = [a for a in container.find_all("a", href=True) if _VIEW_RE.search(a["href"])]
        if found:
            log.info("컨테이너 '%s' 에서 링크 %d개 발견", sel, len(found))
            anchors = found
            break

    if not anchors:
        log.info("알려진 컨테이너를 찾지 못함 -> 문서 전체에서 /view/ 링크 수집(폴백)")
        anchors = [a for a in soup.find_all("a", href=True) if _VIEW_RE.search(a["href"])]

    articles: list[Article] = []
    seen: set[str] = set()
    for anchor in anchors:
        url = _absolute_url(anchor["href"])
        # 쿼리스트링 제거한 키로 중복 판정
        key = url.split("?")[0]
        if key in seen:
            continue
        title = _extract_title(anchor)
        if not title:
            continue
        seen.add(key)
        press = _extract_press(anchor)
        articles.append(Article(rank=len(articles) + 1, title=title, url=url, press=press))
        if len(articles) >= top_n:
            break

    return articles


def scrape(top_n: int = TOP_N) -> list[Article]:
    """기본 URL 로 시도하고, 결과가 부족하면 폴백 URL 로 재시도한다."""
    html = fetch_html(NATE_URL)
    articles = parse_articles(html, top_n=top_n)
    if len(articles) < top_n:
        log.warning(
            "기본 URL 에서 %d개만 파싱됨. 폴백 URL 로 재시도: %s",
            len(articles),
            FALLBACK_URL,
        )
        try:
            html = fetch_html(FALLBACK_URL)
            fallback_articles = parse_articles(html, top_n=top_n)
            if len(fallback_articles) > len(articles):
                articles = fallback_articles
        except requests.RequestException as exc:
            log.warning("폴백 URL 요청 실패: %s", exc)
    return articles


# ---------------------------------------------------------------------------
# Slack payload
# ---------------------------------------------------------------------------
def build_slack_payload(articles: list[Article]) -> dict:
    """Slack Block Kit payload 를 구성한다."""
    now = datetime.now(KST)
    date_str = now.strftime("%Y-%m-%d (%a) %H:%M KST")
    header_text = "📈 오늘의 네이트 경제뉴스 TOP 10"

    blocks: list[dict] = [
        {
            "type": "header",
            "text": {"type": "plain_text", "text": header_text, "emoji": True},
        },
        {
            "type": "context",
            "elements": [{"type": "mrkdwn", "text": f"🗓 {date_str}  ·  출처: 네이트 뉴스"}],
        },
        {"type": "divider"},
    ]

    lines = []
    for a in articles:
        press = f"  _({a.press})_" if a.press else ""
        # mrkdwn 링크: <url|텍스트>. 제목 안의 &,<,> 는 이스케이프.
        safe_title = a.title.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        lines.append(f"*{a.rank}.* <{a.url}|{safe_title}>{press}")

    if lines:
        blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "\n".join(lines)}})
    else:
        blocks.append(
            {
                "type": "section",
                "text": {"type": "mrkdwn", "text": "⚠️ 기사를 가져오지 못했습니다."},
            }
        )

    # 알림/폴백용 plain text
    fallback_lines = [header_text, date_str] + [
        f"{a.rank}. {a.title} ({a.press})" if a.press else f"{a.rank}. {a.title}"
        for a in articles
    ]
    text = "\n".join(fallback_lines)

    return {"text": text, "blocks": blocks}


# ---------------------------------------------------------------------------
# 전송
# ---------------------------------------------------------------------------
def post_to_slack(payload: dict, webhook_url: str) -> None:
    log.info("Slack 전송 시도...")
    resp = requests.post(
        webhook_url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        timeout=REQUEST_TIMEOUT,
    )
    if resp.status_code != 200:
        log.error("Slack 전송 실패 (status=%s): %s", resp.status_code, resp.text)
        resp.raise_for_status()
    log.info("Slack 전송 성공")


# ---------------------------------------------------------------------------
# 엔트리포인트
# ---------------------------------------------------------------------------
def parse_args(argv=None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="네이트 경제뉴스 TOP 10 -> Slack")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Slack 으로 전송하지 않고 payload(JSON)만 출력",
    )
    parser.add_argument("--top", type=int, default=TOP_N, help="가져올 기사 수 (기본 10)")
    return parser.parse_args(argv)


def main(argv=None) -> int:
    args = parse_args(argv)

    try:
        articles = scrape(top_n=args.top)
    except requests.RequestException as exc:
        log.error("네이트 페이지 요청 실패: %s", exc)
        # 요청이 실패해도 dry-run 이면 빈 payload 를 보여준다.
        if not args.dry_run:
            return 1
        articles = []

    log.info("파싱된 기사 수: %d", len(articles))
    for a in articles:
        log.info("  %2d. [%s] %s", a.rank, a.press or "-", a.title)

    payload = build_slack_payload(articles)

    if args.dry_run:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        return 0

    if not articles:
        log.error("전송할 기사가 없어 종료합니다.")
        return 1

    webhook_url = os.environ.get("SLACK_WEBHOOK_URL")
    if not webhook_url:
        log.error("환경변수 SLACK_WEBHOOK_URL 이 설정되지 않았습니다.")
        return 1

    try:
        post_to_slack(payload, webhook_url)
    except requests.RequestException as exc:
        log.error("Slack 전송 중 오류: %s", exc)
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
