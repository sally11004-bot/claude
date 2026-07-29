const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.3, height: 7.5 });
p.layout = "W";

const ORANGE = "D04A02", BLACK = "000000", DGRAY = "2D2D2D", MGRAY = "464646",
      LGRAY = "7D7D7D", HAIR = "EAEAEA", CARD = "F5F5F5", WHITE = "FFFFFF",
      BAR = "F4C4A2", TINT = "FCEBE0", ROWBG = "F7F7F7";
const HEAD = "Georgia", BODY = "Arial";

const s = p.addSlide();
s.background = { color: WHITE };
const shadow = () => ({ type: "outer", color: "C8C8C8", blur: 4, offset: 2, angle: 90, opacity: 0.3 });

// ===== HEADER =====
s.addText("Delivery · 일정 및 조직 (Schedule & Team)", {
  x: 0.5, y: 0.30, w: 9, h: 0.22, fontFace: BODY, fontSize: 10.5, bold: true, color: ORANGE, charSpacing: 1, margin: 0 });
s.addText(
  "표준 12주 Delivery 사이클과 8명 Core Team·Matrix 지원 체계로, 대기업까지 인력 확장만으로 반복 수행이 가능하다",
  { x: 0.5, y: 0.55, w: 12.3, h: 0.72, fontFace: HEAD, fontSize: 19, bold: true, color: BLACK, lineSpacingMultiple: 1.03, valign: "top", margin: 0 });
s.addShape(p.ShapeType.line, { x: 0.5, y: 1.42, w: 12.3, h: 0, line: { color: HAIR, width: 1 } });

// ===== SECTION ① label =====
s.addText([{ text: "① ", options: { color: ORANGE, bold: true } },
           { text: "Delivery Timeline — 표준 12주 사이클 (Scale 단계 최대 24주)", options: { color: DGRAY, bold: true } }],
  { x: 0.5, y: 1.50, w: 12.3, h: 0.24, fontFace: BODY, fontSize: 12, align: "left", margin: 0 });

// ---- Gantt geometry ----
const LX = 0.5, LW = 2.05;              // phase label col
const TX = LX + LW, NC = 12, CW = 0.5875; // timeline: 12 cols
const DX = TX + NC * CW, DW = 12.8 - DX; // deliverable col
const HY = 2.20, HH = 0.28;             // header row
const RH = 0.52;                        // phase row height
const R1 = HY + HH, R2 = R1 + RH, R3 = R2 + RH, RB = R3 + RH; // phase row tops / bottom
const FY = RB, FH = 0.36;               // FTE ramp row
const colX = (i) => TX + (i) * CW;      // left of col i (0-based)
const msX = { poc: colX(3), gate: colX(6), signoff: colX(12) };

// ---- Milestone labels + triangles + guide lines ----
const ms = [
  { x: msX.poc, label: "PoC (W6)", w: 1.2 },
  { x: msX.gate, label: "UAT Gate · 1 Cycle 12주 (W12)", w: 2.2 },
  { x: msX.signoff, label: "Sign-off · 이관 (W24)", w: 2.0 },
];
ms.forEach((m) => {
  s.addText(m.label, { x: m.x - m.w / 2, y: 1.78, w: m.w, h: 0.2, fontFace: BODY, fontSize: 8, bold: true, color: ORANGE, align: "center", margin: 0 });
  s.addShape(p.ShapeType.triangle, { x: m.x - 0.09, y: 2.00, w: 0.18, h: 0.16, rotate: 180, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
  s.addShape(p.ShapeType.line, { x: m.x, y: HY, w: 0, h: RB - HY, line: { color: ORANGE, width: 0.75, dashType: "dash" } });
});

// ---- Header row cells ----
s.addShape(p.ShapeType.rect, { x: LX, y: HY, w: LW, h: HH, fill: { color: LGRAY }, line: { color: WHITE, width: 1 } });
s.addText("과업 / Phase", { x: LX, y: HY, w: LW, h: HH, fontFace: BODY, fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
for (let i = 0; i < NC; i++) {
  s.addShape(p.ShapeType.rect, { x: colX(i), y: HY, w: CW, h: HH, fill: { color: TINT }, line: { color: WHITE, width: 1 } });
  s.addText("W" + (2 * (i + 1)), { x: colX(i), y: HY, w: CW, h: HH, fontFace: BODY, fontSize: 7.5, color: MGRAY, align: "center", valign: "middle", margin: 0 });
}
s.addShape(p.ShapeType.rect, { x: DX, y: HY, w: DW, h: HH, fill: { color: LGRAY }, line: { color: WHITE, width: 1 } });
s.addText("핵심 산출물", { x: DX, y: HY, w: DW, h: HH, fontFace: BODY, fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });

// ---- Phase rows: label + timeline bg grid + deliverable ----
const phases = [
  { top: R1, name: "Phase 1", sub: "Discover & Align", wk: "W1–6", bar: [0, 3], del: "AI Vision Report · Use Case Backlog · 투자 케이스" },
  { top: R2, name: "Phase 2", sub: "Build & Validate", wk: "W5–12", bar: [2, 6], del: "MVP 2–3개 · Skill Package v1.0 · RAI 테스트 리포트" },
  { top: R3, name: "Phase 3", sub: "Scale & Sustain", wk: "W10–24", bar: [4, 12], del: "전사 배포 · CoE 운영 · Managed Service SLA·KPI" },
];
phases.forEach((ph, idx) => {
  // label cell
  s.addShape(p.ShapeType.rect, { x: LX, y: ph.top, w: LW, h: RH, fill: { color: idx % 2 ? WHITE : "FBFBFB" }, line: { color: HAIR, width: 1 } });
  s.addText([{ text: ph.name + "  ", options: { bold: true, color: BLACK } }, { text: ph.wk, options: { color: ORANGE, bold: true } }],
    { x: LX + 0.12, y: ph.top + 0.06, w: LW - 0.2, h: 0.24, fontFace: BODY, fontSize: 10, align: "left", margin: 0 });
  s.addText(ph.sub, { x: LX + 0.12, y: ph.top + 0.28, w: LW - 0.2, h: 0.2, fontFace: BODY, fontSize: 8.5, italic: true, color: LGRAY, align: "left", margin: 0 });
  // timeline cells
  for (let i = 0; i < NC; i++)
    s.addShape(p.ShapeType.rect, { x: colX(i), y: ph.top, w: CW, h: RH, fill: { color: WHITE }, line: { color: HAIR, width: 0.75 } });
  // bar
  const bx = colX(ph.bar[0]), bw = (ph.bar[1] - ph.bar[0]) * CW;
  s.addShape(p.ShapeType.roundRect, { x: bx + 0.04, y: ph.top + 0.14, w: bw - 0.08, h: RH - 0.28, rectRadius: 0.04, fill: { color: BAR }, line: { color: WHITE, width: 0 } });
  // deliverable cell
  s.addShape(p.ShapeType.rect, { x: DX, y: ph.top, w: DW, h: RH, fill: { color: idx % 2 ? WHITE : "FBFBFB" }, line: { color: HAIR, width: 1 } });
  s.addText(ph.del, { x: DX + 0.12, y: ph.top, w: DW - 0.22, h: RH, fontFace: BODY, fontSize: 8.5, color: DGRAY, align: "left", valign: "middle", lineSpacingMultiple: 1.0, margin: 0 });
});

// ---- FTE ramp row ----
s.addShape(p.ShapeType.rect, { x: LX, y: FY, w: 12.8 - LX, h: FH, fill: { color: ROWBG }, line: { color: HAIR, width: 1 } });
s.addText("투입 인력 (FTE)", { x: LX + 0.12, y: FY, w: LW - 0.2, h: FH, fontFace: BODY, fontSize: 8.5, bold: true, color: MGRAY, align: "left", valign: "middle", margin: 0 });
const seg = [
  { c: (colX(0) + colX(3)) / 2, t: "Disc 3–4명" },
  { c: (colX(2) + colX(6)) / 2, t: "Build 6–8명" },
  { c: (colX(4) + colX(12)) / 2, t: "Scale 5–6명" },
];
seg.forEach((g) => s.addText(g.t, { x: g.c - 0.7, y: FY, w: 1.4, h: FH, fontFace: BODY, fontSize: 8.5, bold: true, color: ORANGE, align: "center", valign: "middle", margin: 0 }));
s.addText("누적 최대 7.5 FTE", { x: DX + 0.12, y: FY, w: DW - 0.22, h: FH, fontFace: BODY, fontSize: 8.5, bold: true, color: MGRAY, align: "left", valign: "middle", margin: 0 });

// ===== SECTION ② label =====
s.addText([{ text: "② ", options: { color: ORANGE, bold: true } },
           { text: "Core Team & Staffing — 8명 Core Team + Matrix 지원 체계 (1 Cycle 반복 수행)", options: { color: DGRAY, bold: true } }],
  { x: 0.5, y: 4.56, w: 12.3, h: 0.24, fontFace: BODY, fontSize: 12, align: "left", margin: 0 });

// ---- Team chips ----
const GX = 0.5, GAP = 0.2, CHW = (12.3 - 3 * GAP) / 4, CHH = 0.60;
const RY1 = 4.86, RY2 = RY1 + CHH + 0.08;
const cxs = [GX, GX + (CHW + GAP), GX + 2 * (CHW + GAP), GX + 3 * (CHW + GAP)];
const roles = [
  { r: "Engagement Partner", n: "×1", d: "투입률 20% · 전 기간" },
  { r: "AI Strategy Lead", n: "×1", d: "투입률 100% · 전 기간" },
  { r: "AI Engineer", n: "×2", d: "투입률 100% · Build–Scale" },
  { r: "Change Manager", n: "×1", d: "투입률 80% · Disc–Scale" },
  { r: "UX Designer", n: "×1", d: "투입률 60% · Disc–Build" },
  { r: "RAI Specialist", n: "×1", d: "투입률 50% · Build–Scale" },
  { r: "Data Engineer", n: "×1", d: "투입률 100% · Build" },
];
function chip(x, y, r, n, d) {
  s.addShape(p.ShapeType.roundRect, { x, y, w: CHW, h: CHH, rectRadius: 0.05, fill: { color: CARD }, line: { color: HAIR, width: 1 }, shadow: shadow() });
  s.addText([{ text: r + "  ", options: { bold: true, color: BLACK } }, { text: n, options: { bold: true, color: ORANGE } }],
    { x: x + 0.16, y: y + 0.09, w: CHW - 0.28, h: 0.26, fontFace: BODY, fontSize: 10.5, align: "left", margin: 0 });
  s.addText(d, { x: x + 0.16, y: y + 0.35, w: CHW - 0.28, h: 0.2, fontFace: BODY, fontSize: 8.5, color: LGRAY, align: "left", margin: 0 });
}
roles.forEach((ro, i) => {
  const y = i < 4 ? RY1 : RY2;
  chip(cxs[i % 4], y, ro.r, ro.n, ro.d);
});
// summary tile (8th cell, orange)
const sx = cxs[3], sy = RY2;
s.addShape(p.ShapeType.roundRect, { x: sx, y: sy, w: CHW, h: CHH, rectRadius: 0.05, fill: { color: ORANGE }, line: { color: ORANGE, width: 1 }, shadow: shadow() });
s.addText([{ text: "Core Team 8명", options: { bold: true, color: WHITE, breakLine: true } },
           { text: "대기업 시 → 12명 (7.5 FTE)", options: { color: "FDE0D2", bold: true } }],
  { x: sx + 0.1, y: sy, w: CHW - 0.2, h: CHH, fontFace: BODY, fontSize: 10, align: "center", valign: "middle", lineSpacingMultiple: 1.1, margin: 0 });

// ===== BUMPER =====
const BY = 6.30, BH = 0.55;
s.addShape(p.ShapeType.rect, { x: 0.5, y: BY, w: 12.3, h: BH, fill: { color: CARD }, line: { color: CARD, width: 0 } });
s.addShape(p.ShapeType.rect, { x: 0.5, y: BY, w: 0.08, h: BH, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
s.addText([{ text: "So What  ", options: { bold: true, color: ORANGE } },
           { text: "표준화된 12주 사이클과 8명 Core Team + Matrix 지원 구조로, 대기업까지 인력만 확장(최대 12명·7.5 FTE)하면 동일 방법론으로 반복 수행이 가능하다.", options: { bold: true, color: DGRAY } }],
  { x: 0.74, y: BY, w: 11.9, h: BH, fontFace: BODY, fontSize: 10.5, align: "left", valign: "middle", margin: 0 });

// ===== SOURCE =====
s.addText("Source: PwC Analysis, 2026 · Standard Delivery Model (1 Cycle = 12 Weeks, Scale 단계 최대 24주) · Confidential", {
  x: 0.5, y: 6.98, w: 12.3, h: 0.22, fontFace: BODY, fontSize: 9, color: LGRAY, align: "left", margin: 0 });

p.writeFile({ fileName: "/home/user/claude/ppt-work/Delivery_일정및조직.pptx" }).then((f) => console.log("Saved:", f));
