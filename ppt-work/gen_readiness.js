const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.3, height: 7.5 });
p.layout = "W";

const ORANGE = "D04A02", BLACK = "000000", DGRAY = "2D2D2D", MGRAY = "464646",
      LGRAY = "7D7D7D", HAIR = "EAEAEA", CARD = "F5F5F5", WHITE = "FFFFFF",
      TINT = "FCEBE0";
const HEAD = "Georgia", BODY = "Arial";

const s = p.addSlide();
s.background = { color: WHITE };
const shadow = () => ({ type: "outer", color: "C8C8C8", blur: 4, offset: 2, angle: 90, opacity: 0.3 });

// ===== HEADER =====
s.addText("준비사항 · 서비스 추진 준비사항 (Service Launch Readiness)", {
  x: 0.5, y: 0.30, w: 10, h: 0.22, fontFace: BODY, fontSize: 10.5, bold: true, color: ORANGE, charSpacing: 1, margin: 0 });
s.addText(
  "성공적 사업화를 위해 파트너 자격·계약, 회사간 R&R, 데이터 보안, 법·규제 준수 등 서비스 전제 조건을 착수 전 명확히 확정해야 한다",
  { x: 0.5, y: 0.55, w: 12.3, h: 0.75, fontFace: HEAD, fontSize: 18, bold: true, color: BLACK, lineSpacingMultiple: 1.03, valign: "top", margin: 0 });
s.addShape(p.ShapeType.line, { x: 0.5, y: 1.42, w: 12.3, h: 0, line: { color: HAIR, width: 1 } });

// ===== 3 PILLAR CARDS =====
const CARDY = 1.55, CARDH = 3.62, CARDW = 3.9;
const CX = [0.5, 4.7, 8.9];

function pillar(x, num, title, eng, emphasis, bullets) {
  s.addShape(p.ShapeType.roundRect, { x, y: CARDY, w: CARDW, h: CARDH, rectRadius: 0.05, fill: { color: WHITE }, line: { color: HAIR, width: 1 }, shadow: shadow() });
  // number badge
  s.addShape(p.ShapeType.ellipse, { x: x + 0.24, y: 1.70, w: 0.36, h: 0.36, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
  s.addText(String(num), { x: x + 0.24, y: 1.70, w: 0.36, h: 0.36, fontFace: BODY, fontSize: 15, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
  // title + eng
  s.addText(title, { x: x + 0.70, y: 1.68, w: CARDW - 0.94, h: 0.30, fontFace: BODY, fontSize: 13.5, bold: true, color: BLACK, align: "left", valign: "middle", margin: 0 });
  s.addText(eng, { x: x + 0.70, y: 1.99, w: CARDW - 0.94, h: 0.22, fontFace: BODY, fontSize: 9, italic: true, color: LGRAY, align: "left", margin: 0 });
  // divider
  s.addShape(p.ShapeType.line, { x: x + 0.24, y: 2.26, w: CARDW - 0.48, h: 0, line: { color: HAIR, width: 1 } });
  // emphasis roll-up (orange tinted)
  s.addShape(p.ShapeType.roundRect, { x: x + 0.20, y: 2.34, w: CARDW - 0.40, h: 0.78, rectRadius: 0.04, fill: { color: TINT }, line: { color: TINT, width: 0 } });
  s.addText(emphasis, { x: x + 0.34, y: 2.34, w: CARDW - 0.66, h: 0.78, fontFace: BODY, fontSize: 10, bold: true, italic: true, color: ORANGE, align: "left", valign: "middle", lineSpacingMultiple: 1.02, margin: 0 });
  // bullets
  const runs = [];
  bullets.forEach((b) => {
    runs.push({ text: b.l + "  ", options: { bold: true, color: DGRAY, bullet: { code: "2022", indent: 12 } } });
    runs.push({ text: b.t, options: { color: MGRAY, breakLine: true } });
  });
  s.addText(runs, { x: x + 0.30, y: 3.22, w: CARDW - 0.54, h: 1.86, fontFace: BODY, fontSize: 9.5, align: "left", valign: "top", paraSpaceAfter: 6, lineSpacingMultiple: 1.0, margin: 0 });
}

pillar(CX[0], 1, "파트너십 체결", "Partnership Execution",
  "명확한 파트너십 관계 정립 — 재판매·서비스 제공의 법적·상업적 기반 확보",
  [
    { l: "파트너 자격 ·", t: "Anthropic MOU → 정식 Delivery Partner 취득" },
    { l: "계약·권한 ·", t: "Claude Enterprise 재판매·라이선스 조건 확정" },
    { l: "회사간 R&R ·", t: "AWS–Anthropic–PwC 역할·수익 배분 합의" },
    { l: "지원 체계 ·", t: "벤더 에스컬레이션·기술지원 경로 확보" },
  ]);

pillar(CX[1], 2, "AI 모델 차별화", "Responsible AI Differentiation",
  "PwC 감사·규제 DNA를 Responsible AI 프레임워크로 전환, 타사 대비 결정적 차별화 확보",
  [
    { l: "Governance by Design ·", t: "정책·가드레일 내재화, 승인·통제 지점 정의" },
    { l: "Assurance & Audit ·", t: "감사 추적·설명가능성·규제 준수 리포팅" },
    { l: "Safety Testing ·", t: "PyRIT 기반 레드팀·편향·공정성 검증" },
    { l: "Standard 준거 ·", t: "NIST AI RMF·EU AI Act 대응 체계" },
  ]);

pillar(CX[2], 3, "서비스 카탈로그", "Service Catalog",
  "서비스/운영체계 + Package별 서비스 내용 표준화 — 반복 판매·운영 기반 확립",
  [
    { l: "① 서비스 & 운영체계 ·", t: "서비스 정의·SLA·운영 프로세스·지원 RACI·과금 체계" },
    { l: "② Package별 서비스 내용 ·", t: "Essential/Professional/Enterprise 3-Tier별 범위·산출물·구독 가격" },
  ]);

// ===== CROSS-CUTTING PREREQUISITES =====
s.addText([{ text: "＋ ", options: { color: ORANGE, bold: true } },
           { text: "사전 확정 필수 — 전(全) 서비스 공통 전제 조건 (Cross-cutting Prerequisites)", options: { color: DGRAY, bold: true } }],
  { x: 0.5, y: 5.30, w: 12.3, h: 0.24, fontFace: BODY, fontSize: 11, align: "left", margin: 0 });

const chips = [
  { l: "데이터 보안", t: "암호화·PII 마스킹·Zero-Retention" },
  { l: "법·규제 준수", t: "산업 규제·개인정보·AI 규제 대응" },
  { l: "시스템 / Infra", t: "AWS 리전·SSO/SCIM 연동 (필요 시)" },
  { l: "Training / HR", t: "Core Team 역량·인증·챔피언 교육" },
];
const cw = (12.3 - 3 * 0.2) / 4, cy = 5.58, chh = 0.56;
chips.forEach((c, i) => {
  const x = 0.5 + i * (cw + 0.2);
  s.addShape(p.ShapeType.roundRect, { x, y: cy, w: cw, h: chh, rectRadius: 0.05, fill: { color: CARD }, line: { color: HAIR, width: 1 } });
  s.addText(c.l, { x: x + 0.16, y: cy + 0.07, w: cw - 0.28, h: 0.24, fontFace: BODY, fontSize: 10, bold: true, color: BLACK, align: "left", margin: 0 });
  s.addText(c.t, { x: x + 0.16, y: cy + 0.31, w: cw - 0.28, h: 0.22, fontFace: BODY, fontSize: 8.3, color: LGRAY, align: "left", margin: 0 });
});

// ===== BUMPER =====
const BY = 6.32, BH = 0.54;
s.addShape(p.ShapeType.rect, { x: 0.5, y: BY, w: 12.3, h: BH, fill: { color: CARD }, line: { color: CARD, width: 0 } });
s.addShape(p.ShapeType.rect, { x: 0.5, y: BY, w: 0.08, h: BH, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
s.addText([{ text: "So What  ", options: { bold: true, color: ORANGE } },
           { text: "전제 조건을 착수 전 확정해야 사업화 리스크를 제거하고, Responsible AI 차별화와 표준 서비스 카탈로그로 반복 매출형 서비스를 안정적으로 출시할 수 있다.", options: { bold: true, color: DGRAY } }],
  { x: 0.74, y: BY, w: 11.9, h: BH, fontFace: BODY, fontSize: 10.5, align: "left", valign: "middle", margin: 0 });

// ===== SOURCE =====
s.addText("Source: PwC Analysis, 2026 · Service Launch Readiness Checklist · Confidential", {
  x: 0.5, y: 7.00, w: 12.3, h: 0.22, fontFace: BODY, fontSize: 9, color: LGRAY, align: "left", margin: 0 });

p.writeFile({ fileName: "/home/user/claude/ppt-work/준비사항_서비스추진.pptx" }).then((f) => console.log("Saved:", f));
