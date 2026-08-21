# 카카오 "나에게 보내기" 최초 설정 가이드

이 연동은 **카카오 REST API의 `memo/default/send`(나에게 기본 템플릿 보내기)** 를
사용합니다. 친구 동의나 별도 검수 없이, 내 계정으로 나에게 메시지를 보낼 수 있습니다.

## 1. 카카오 개발자 앱 만들기

1. https://developers.kakao.com → 로그인 → **내 애플리케이션** → **애플리케이션 추가하기**.
2. 앱을 만들면 **앱 키**에서 **REST API 키**를 확인합니다. (이 값이 `rest_api_key`)

## 2. 카카오 로그인 & 동의항목 설정

1. 앱 대시보드 → **카카오 로그인** → **활성화 설정** ON.
2. **Redirect URI** 등록. 로컬에서 코드만 받아올 거라면 `http://localhost` 로 등록해도 됩니다.
   (서버를 띄울 필요는 없고, 리다이렉트된 주소창의 `code` 값만 복사하면 됩니다.)
3. **카카오 로그인 → 동의항목** → **접근권한 관리**에서
   **카카오톡 메시지 전송(`talk_message`)** 을 사용 설정합니다.

## 3. 리프레시 토큰 발급 (최초 1회, 브라우저 필요)

본인 로컬 컴퓨터에서 실행하세요:

```bash
python .claude/skills/kakao-memo/scripts/get_token.py \
  --rest-api-key <REST_API_KEY> \
  --redirect-uri http://localhost
```

- 출력된 인증 URL을 브라우저에서 열고 로그인/동의합니다.
- 리다이렉트된 주소창의 `?code=XXXX` 값을 복사해 붙여넣습니다.
- 성공하면 `~/.claude/kakao_config.json` 에 `rest_api_key` / `refresh_token` /
  `access_token` 이 저장됩니다.

## 4. 자격 증명 저장 방식 (둘 중 하나)

### A. 설정 파일 (기본, 권장)
`get_token.py` 가 자동으로 만드는 `~/.claude/kakao_config.json`:

```json
{
  "rest_api_key": "여기에_REST_API_KEY",
  "refresh_token": "여기에_리프레시_토큰",
  "access_token": "",
  "access_token_expires_at": 0
}
```

`send_memo.py` 가 액세스 토큰 만료 시 리프레시 토큰으로 자동 갱신하고
이 파일에 다시 캐시합니다. 파일 권한은 `600` 으로 설정됩니다.

경로를 바꾸려면 `KAKAO_CONFIG_PATH` 환경변수를 지정하세요.

### B. 환경변수
파일 대신 환경변수로도 됩니다 (CI 등):

```bash
export KAKAO_REST_API_KEY="..."
export KAKAO_REFRESH_TOKEN="..."
```

환경변수는 설정 파일 값보다 우선합니다.

## 5. 전송 테스트

```bash
python .claude/skills/kakao-memo/scripts/send_memo.py "테스트 메시지입니다"
```

카카오톡의 "나와의 채팅"에 메시지가 도착하면 성공입니다.

## 토큰 수명 참고

- **액세스 토큰**: 약 6시간. 만료 시 자동 갱신됩니다.
- **리프레시 토큰**: 약 2개월. 갱신 과정에서 카카오가 새 리프레시 토큰을 내려주면
  자동으로 교체 저장합니다. 오래 방치해 만료되면 3단계를 다시 수행하세요.

## 보안 주의

- `kakao_config.json`, REST API 키, 토큰은 **절대 커밋하지 마세요.**
  (저장소의 `.gitignore` 에 이미 제외 규칙을 추가해 두었습니다.)
- 토큰을 명령행 인자로 넘기지 마세요(셸 히스토리에 남습니다). 파일/환경변수를 쓰세요.
