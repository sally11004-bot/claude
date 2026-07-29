const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.3, height: 7.5 });
p.layout = "W";

// ---- Palette (PwC) ----
const ORANGE = "D04A02";
const BLACK = "000000";
const DGRAY = "2D2D2D";
const MGRAY = "464646";
const LGRAY = "7D7D7D";
const HAIR = "EAEAEA";
const CARD = "F5F5F5";
const WHITE = "FFFFFF";

const HEAD = "Georgia";
const BODY = "Arial";

const s = p.addSlide();
s.background = { color: WHITE };

const shadow = () => ({ type: "outer", color: "BFBFBF", blur: 4, offset: 2, angle: 90, opacity: 0.32 });

// ================= HEADER =================
s.addText("기술협력 체계 · Technical Collaboration Framework", {
  x: 0.5, y: 0.30, w: 9.0, h: 0.24, align: "left",
  fontFace: BODY, fontSize: 10.5, bold: true, color: ORANGE, charSpacing: 1, margin: 0,
});
s.addText(
  "PwC는 AWS Cloud 인프라와 Anthropic Claude Platform을 결합해, 추가 개발 없이 고객 접점의 전략·구축·운영을 전담하는 3자 기술협력 체계를 구축한다",
  { x: 0.5, y: 0.56, w: 12.3, h: 0.92, align: "left", valign: "top",
    fontFace: HEAD, fontSize: 19, bold: true, color: BLACK, lineSpacingMultiple: 1.04, margin: 0 }
);
// thin divider
s.addShape(p.ShapeType.line, { x: 0.5, y: 1.56, w: 12.3, h: 0, line: { color: HAIR, width: 1 } });

// ================= DIAGRAM =================
// ---- Enabler card helper ----
function enablerCard(x, y, name, sub, role, statusLabel) {
  const w = 3.3, h = 1.7;
  s.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.06, fill: { color: CARD }, line: { color: HAIR, width: 1 }, shadow: shadow() });
  s.addText(name, { x: x + 0.22, y: y + 0.12, w: w - 0.4, h: 0.34, fontFace: BODY, fontSize: 15, bold: true, color: BLACK, align: "left", margin: 0 });
  s.addText(sub, { x: x + 0.22, y: y + 0.47, w: w - 0.35, h: 0.22, fontFace: BODY, fontSize: 9, italic: true, color: LGRAY, align: "left", margin: 0 });
  s.addText(role, { x: x + 0.22, y: y + 0.72, w: w - 0.4, h: 0.5, fontFace: BODY, fontSize: 11, color: DGRAY, align: "left", valign: "top", margin: 0 });
  // status pill
  s.addShape(p.ShapeType.roundRect, { x: x + 0.22, y: y + h - 0.42, w: w - 0.44, h: 0.3, rectRadius: 0.05, fill: { color: WHITE }, line: { color: ORANGE, width: 1 } });
  s.addText(statusLabel, { x: x + 0.22, y: y + h - 0.42, w: w - 0.44, h: 0.3, fontFace: BODY, fontSize: 8.8, bold: true, color: ORANGE, align: "center", valign: "middle", margin: 0 });
}

// AWS (top-left)
enablerCard(0.5, 1.80, "AWS", "Cloud Infrastructure · 추가 인력/개발 없음",
  "고도화된 Cloud 인프라·컴퓨팅 자원 제공", "STATUS · 기존 협력 관계 유지");
// Anthropic (bottom-left)
enablerCard(0.5, 3.75, "Anthropic", "Claude Enterprise Platform · 추가 인력/개발 없음",
  "고도화된 Claude 플랫폼·모델 제공", "STATUS · 파트너십 체결 추진 중");

// "+" combiner between the two enabler cards
s.addShape(p.ShapeType.ellipse, { x: 1.97, y: 3.445, w: 0.36, h: 0.36, fill: { color: ORANGE }, line: { color: WHITE, width: 1.5 } });
s.addText("+", { x: 1.97, y: 3.425, w: 0.36, h: 0.36, fontFace: BODY, fontSize: 16, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });

// ---- Arrows into PwC ----
s.addShape(p.ShapeType.line, { x: 3.82, y: 2.65, w: 0.86, h: 0, line: { color: MGRAY, width: 1.75, endArrowType: "triangle" } });
s.addShape(p.ShapeType.line, { x: 3.82, y: 4.60, w: 0.86, h: 0, line: { color: MGRAY, width: 1.75, endArrowType: "triangle" } });
s.addText("인프라 제공", { x: 3.70, y: 2.42, w: 1.10, h: 0.2, fontFace: BODY, fontSize: 8, color: LGRAY, align: "center", margin: 0 });
s.addText("플랫폼 제공", { x: 3.70, y: 4.37, w: 1.10, h: 0.2, fontFace: BODY, fontSize: 8, color: LGRAY, align: "center", margin: 0 });

// ---- PwC hub (center, orange) ----
const px = 4.72, py = 2.30, pw = 3.58, ph = 2.65;
s.addShape(p.ShapeType.roundRect, { x: px, y: py, w: pw, h: ph, rectRadius: 0.06, fill: { color: ORANGE }, line: { color: ORANGE, width: 1 }, shadow: shadow() });
s.addText("PwC", { x: px + 0.24, y: py + 0.16, w: pw - 0.4, h: 0.42, fontFace: BODY, fontSize: 18, bold: true, color: WHITE, align: "left", margin: 0 });
s.addText("Orchestration & Delivery — 고객 접점 전담", { x: px + 0.24, y: py + 0.60, w: pw - 0.4, h: 0.24, fontFace: BODY, fontSize: 10.5, italic: true, color: "FBE2D5", align: "left", margin: 0 });
s.addText(
  [
    { text: "컨설팅 · AI Operating Model 설계", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "구축 · AX Platform 도입·통합", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "운영 · Managed Service 고도화", options: { bullet: { code: "2022" }, breakLine: false } },
  ],
  { x: px + 0.30, y: py + 0.95, w: pw - 0.5, h: 1.02, fontFace: BODY, fontSize: 11, color: WHITE, align: "left", valign: "top", paraSpaceAfter: 6, margin: 0 }
);
// PwC accountability pill (white)
s.addShape(p.ShapeType.roundRect, { x: px + 0.24, y: py + ph - 0.56, w: pw - 0.48, h: 0.42, rectRadius: 0.05, fill: { color: WHITE }, line: { color: WHITE, width: 1 } });
s.addText("Single Point of Accountability · 통합 딜리버리 단일 책임", { x: px + 0.24, y: py + ph - 0.56, w: pw - 0.48, h: 0.42, fontFace: BODY, fontSize: 9.5, bold: true, color: ORANGE, align: "center", valign: "middle", margin: 0 });

// ---- Arrow PwC -> Customer ----
s.addShape(p.ShapeType.line, { x: 8.32, y: 3.625, w: 0.66, h: 0, line: { color: ORANGE, width: 2.25, endArrowType: "triangle" } });
s.addText("통합 전달", { x: 8.20, y: 3.40, w: 0.92, h: 0.2, fontFace: BODY, fontSize: 8, color: LGRAY, align: "center", margin: 0 });

// ---- Customer card (right, orange border highlight) ----
const cx = 9.02, cy = 2.60, cw = 3.28, chh = 2.05;
s.addShape(p.ShapeType.roundRect, { x: cx, y: cy, w: cw, h: chh, rectRadius: 0.06, fill: { color: WHITE }, line: { color: ORANGE, width: 2 }, shadow: shadow() });
s.addText("고객 (Enterprise)", { x: cx + 0.22, y: cy + 0.14, w: cw - 0.4, h: 0.3, fontFace: BODY, fontSize: 14, bold: true, color: BLACK, align: "left", margin: 0 });
s.addText("Expected Business Outcome", { x: cx + 0.22, y: cy + 0.46, w: cw - 0.4, h: 0.22, fontFace: BODY, fontSize: 9, italic: true, color: LGRAY, align: "left", margin: 0 });
s.addText(
  [
    { text: "AI 도입 → 성과 전환 실현", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "Claude 기반 전사 업무 활용", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "반복 매출형 AX 서비스 수혜", options: { bullet: { code: "2022" }, breakLine: false } },
  ],
  { x: cx + 0.28, y: cy + 0.74, w: cw - 0.5, h: 1.1, fontFace: BODY, fontSize: 10.5, color: DGRAY, align: "left", valign: "top", paraSpaceAfter: 6, margin: 0 }
);

// ================= BUMPER =================
const by = 5.92, bh = 0.60;
s.addShape(p.ShapeType.rect, { x: 0.5, y: by, w: 12.3, h: bh, fill: { color: CARD }, line: { color: CARD, width: 0 } });
s.addShape(p.ShapeType.rect, { x: 0.5, y: by, w: 0.08, h: bh, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
s.addText(
  [
    { text: "So What  ", options: { bold: true, color: ORANGE } },
    { text: "AWS·Anthropic의 검증된 자산은 그대로 활용하되, PwC가 통합·전달의 단일 책임 주체로서 고객 성과 실현과 반복 매출 구조를 확보한다.", options: { bold: true, color: DGRAY } },
  ],
  { x: 0.74, y: by, w: 11.9, h: bh, fontFace: BODY, fontSize: 11, align: "left", valign: "middle", margin: 0 }
);

// ================= SOURCE =================
s.addText("Source: PwC Analysis, 2026 · AWS 기존 협력 / Anthropic 파트너십 추진 현황 기준 · Confidential", {
  x: 0.5, y: 6.72, w: 12.3, h: 0.24, fontFace: BODY, fontSize: 9, color: LGRAY, align: "left", margin: 0,
});

p.writeFile({ fileName: "/home/user/claude/ppt-work/기술협력체계.pptx" }).then((f) => console.log("Saved:", f));
