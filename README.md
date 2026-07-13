# 네이트 경제뉴스 → Slack 자동 전송

매일 아침 **09:00 KST** 에 [네이트 뉴스](https://news.nate.com/) 의 **경제 부문 일간 랭킹 TOP 10** 을
스크랩해서 Slack 채널로 자동 전송하는 GitHub Actions 자동화입니다.

## 무엇을 하나요?

- 네이트 경제 랭킹 페이지(`https://news.nate.com/rank/interest?sc=eco&p=day`)를 가져옵니다.
- 페이지는 **EUC-KR** 인코딩이라 해당 인코딩으로 디코딩한 뒤 파싱합니다.
- 상위 10개 기사(순위, 제목, 링크, 언론사명)를 추출합니다.
- Slack **Block Kit** 형식으로 예쁘게 구성해서 Incoming Webhook 으로 전송합니다.
  - 헤더: `📈 오늘의 네이트 경제뉴스 TOP 10`
  - 현재 KST 날짜/시각 표시
  - 클릭 가능한 링크로 된 번호 목록(언론사명 포함)
  - Slack 알림/폴백용 `text` 필드 포함

## 구성 파일

| 경로 | 설명 |
| --- | --- |
| `scripts/nate_econ_news.py` | 스크래퍼 + Slack 전송 스크립트 |
| `scripts/requirements.txt` | 의존성(`requests`, `beautifulsoup4`, `lxml`) |
| `.github/workflows/nate-econ-news.yml` | 매일 09:00 KST 실행 워크플로우 |

## 사전 준비: Slack Incoming Webhook 만들기

1. https://api.slack.com/apps 에서 **Create New App → From scratch** 로 앱을 만듭니다.
   (또는 기존 앱 사용)
2. 좌측 메뉴 **Incoming Webhooks** 를 켠 뒤(**Activate Incoming Webhooks → On**),
   **Add New Webhook to Workspace** 를 클릭합니다.
3. 뉴스를 받을 **채널을 선택**하고 승인하면 `https://hooks.slack.com/services/...` 형태의
   Webhook URL 이 발급됩니다. 이 URL 을 복사합니다.

## GitHub 저장소 시크릿 등록 (필수)

발급받은 Webhook URL 을 저장소 시크릿으로 등록해야 워크플로우가 전송할 수 있습니다.

1. GitHub 저장소 → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭
3. 다음과 같이 입력 후 저장:
   - **Name**: `SLACK_WEBHOOK_URL`
   - **Secret**: 복사한 `https://hooks.slack.com/services/...` URL

> 이 시크릿(`SLACK_WEBHOOK_URL`) 하나만 등록하면 됩니다.

## 실행 방법

### 1) 자동 실행 (예약)

워크플로우는 매일 **00:00 UTC = 09:00 KST** 에 자동 실행됩니다. 별도 조작이 필요 없습니다.

### 2) 수동 실행 (workflow_dispatch)

GitHub 저장소 → **Actions** 탭 → 좌측 **Nate Economy News to Slack** 선택 →
우측 **Run workflow** 버튼으로 즉시 실행할 수 있습니다.

### 3) 로컬 실행 / 테스트

```bash
# 의존성 설치
pip install -r scripts/requirements.txt

# 전송하지 않고 payload(JSON)만 출력 — 파싱/포맷 확인용
python scripts/nate_econ_news.py --dry-run

# 실제 전송 (환경변수 필요)
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
python scripts/nate_econ_news.py
```

- `--dry-run`: Slack 으로 **전송하지 않고** 구성된 payload 만 출력합니다.
  `SLACK_WEBHOOK_URL` 이 없어도 동작합니다.
- `--top N`: 가져올 기사 수를 조정합니다(기본 10).

## 스케줄 관련 참고

- GitHub Actions 의 `cron` 은 **항상 UTC** 기준입니다.
  워크플로우의 `0 0 * * *` 는 **00:00 UTC**, 즉 **09:00 KST(UTC+9)** 에 해당합니다.
- GitHub 의 예약 워크플로우는 러너 부하가 높은 시간대에 **수 분~수십 분 지연**되거나
  드물게 건너뛸 수 있습니다(정시 도착을 보장하지 않음). 정확한 시각이 중요하면
  이 점을 감안하세요.

## 동작 방식(파서) 참고

네이트 페이지 마크업 변경에 대비해 파서는 여러 셀렉터 폴백을 갖습니다.

1. 알려진 랭킹 컨테이너(`div.postRankSubjectList` 등) 안에서 기사 상세(`/view/`) 링크를 수집
2. 실패 시 문서 전체에서 `/view/` 링크를 문서 순서대로 수집
3. URL 기준 중복 제거 후 상위 10개 반환

언론사명은 `span.medium`, `span.press` 등 여러 후보에서 탐색하며, 못 찾으면 생략합니다.
