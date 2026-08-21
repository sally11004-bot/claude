---
name: kakao-memo
description: 카카오톡 "나에게 보내기(memo)" 연동. 사용자가 카카오톡/카톡으로 나에게 메시지·알림·리포트를 보내달라고 하거나, 카카오 나에게 보내기 설정을 하려고 할 때 사용한다. 카카오 REST API의 memo/default/send 를 사용하며 리프레시 토큰으로 액세스 토큰을 자동 갱신한다. 트리거 예시- "카톡으로 보내줘", "카카오톡 나에게 보내기", "결과를 카톡으로 알려줘", "카카오 메시지 전송".
---

# 카카오톡 "나에게 보내기" (kakao-memo)

카카오 REST API `memo/default/send` 로 **내 계정의 "나와의 채팅"** 에 메시지를
보내는 스킬. 친구 동의·앱 검수가 필요 없는 가장 단순한 카카오 메시지 연동이다.

## 전제: 자격 증명

전송에는 리프레시 토큰이 필요하다. `~/.claude/kakao_config.json`(또는
`KAKAO_REST_API_KEY`+`KAKAO_REFRESH_TOKEN` 환경변수)에 자격 증명이 있어야 한다.

- **자격 증명이 없으면** 먼저 `references/setup.md` 를 사용자에게 안내한다.
  (카카오 개발자 앱 생성 → `talk_message` 동의항목 → `get_token.py` 로 최초 토큰 발급.)
  최초 토큰 발급은 브라우저가 필요하므로 **사용자 본인 로컬에서** 실행해야 한다.
- 자격 증명이 이미 있으면 곧바로 전송한다.

## 메시지 보내기

`scripts/send_memo.py` 를 실행한다. 토큰 갱신·캐싱은 스크립트가 알아서 처리한다.

```bash
python .claude/skills/kakao-memo/scripts/send_memo.py "보낼 메시지"
```

옵션:
- `--link <URL>` : 메시지에 연결되는 URL (버튼/말풍선 클릭 시 이동).
- `--button <제목>` : 메시지 하단 버튼 이름.
- `--stdin` : 긴/여러 줄 메시지는 stdin 으로 전달.

예:
```bash
python .claude/skills/kakao-memo/scripts/send_memo.py \
  "배포 완료 ✅  main #1234 통과" --link https://example.com/ci --button "CI 보기"

printf '오늘 요약:\n- A 완료\n- B 진행중' | \
  python .claude/skills/kakao-memo/scripts/send_memo.py --stdin
```

## 제약

- `text` 템플릿 본문은 **최대 200자**. 길면 요약하거나 나눠 보낸다.
- 성공 응답은 `{"result_code": 0}`. 스크립트가 종료코드 0/1 로 성공·실패를 알린다.
- 401(토큰 만료)은 스크립트가 자동으로 한 번 리프레시 후 재시도한다. 그래도
  실패하면 리프레시 토큰 만료 가능성 → `references/setup.md` 의 재발급 안내.

## 보안

- 토큰·키를 커밋하거나 로그에 남기지 않는다. 명령행 인자로 토큰을 넘기지 않는다.
- `kakao_config.json` 은 `.gitignore` 로 제외되어 있다.

## 파일 구성

- `scripts/kakao_client.py` — 토큰 갱신 + 전송 로직 (표준 라이브러리만 사용).
- `scripts/send_memo.py` — CLI 진입점.
- `scripts/get_token.py` — 최초 리프레시 토큰 발급 (브라우저 필요, 1회).
- `references/setup.md` — 카카오 앱 등록부터 토큰 발급까지 전체 설정 가이드.
