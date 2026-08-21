---
description: 카카오톡 "나에게 보내기"로 메시지 전송 (kakao-memo skill)
argument-hint: [보낼 메시지, 예: "배포 완료 ✅"]
---

`kakao-memo` skill을 사용해 카카오톡 "나에게 보내기(memo/default/send)"로 메시지를 보내라.

- 자격 증명(`~/.claude/kakao_config.json` 또는 `KAKAO_REST_API_KEY`/`KAKAO_REFRESH_TOKEN`)이
  없으면 전송을 시도하지 말고 `references/setup.md` 최초 설정을 먼저 안내하라.
- 자격 증명이 있으면 `scripts/send_memo.py` 로 전송하고 결과를 보고하라.
- 본문이 200자를 넘으면 요약하거나 나눠 보내라.
- URL/버튼이 필요하면 `--link`, `--button` 옵션을 활용하라.

보낼 메시지: $ARGUMENTS
