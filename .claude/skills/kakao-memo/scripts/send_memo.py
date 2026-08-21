#!/usr/bin/env python3
"""
Send a "나에게 보내기" (send-to-me) message via the Kakao memo API.

Usage:
    python send_memo.py "메시지 내용"
    python send_memo.py "메시지 내용" --link https://example.com --button "열기"
    echo "여러 줄\n메시지" | python send_memo.py --stdin
    python send_memo.py "제목" --link https://... --button "리포트 보기"

Exit code 0 on success, 1 on any error (message printed to stderr).

Credentials come from env vars or ~/.claude/kakao_config.json — see the skill's
references/setup.md. Never pass tokens on the command line.
"""

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from kakao_client import KakaoClient, KakaoError, text_template  # noqa: E402


def main() -> int:
    parser = argparse.ArgumentParser(description="Send a Kakao memo to myself.")
    parser.add_argument("text", nargs="?", help="Message text (max 200 chars).")
    parser.add_argument("--stdin", action="store_true", help="Read message text from stdin.")
    parser.add_argument("--link", help="URL for the message link / button.")
    parser.add_argument("--button", help="Button title (shown under the message).")
    args = parser.parse_args()

    if args.stdin:
        text = sys.stdin.read().strip()
    elif args.text:
        text = args.text
    else:
        parser.error("Provide message text as an argument or use --stdin.")
        return 1

    if not text:
        print("Error: empty message text.", file=sys.stderr)
        return 1

    try:
        client = KakaoClient()
        template = text_template(text, link_url=args.link, button_title=args.button)
        result = client.send_memo(template)
    except KakaoError as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1

    # Kakao returns {"result_code": 0} on success.
    if result.get("result_code") == 0:
        print("✅ 카카오톡 '나에게 보내기' 전송 완료")
        return 0
    print(f"⚠️  전송은 되었으나 예상과 다른 응답: {result}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
