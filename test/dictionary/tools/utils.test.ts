import assert from "node:assert/strict";
import { normalizeWithMark, countEffectiveChars } from "../../../dictionary/tools/utils.ts";
import { classify } from "../../../dictionary/categories.ts";

describe("normalizeWithMark", () => {
  it("長音符なしの語に長音符を付与する", () => {
    assert.equal(normalizeWithMark("ユーザ"), "ユーザー");
  });

  it("長音符ありの語はそのまま返す", () => {
    assert.equal(normalizeWithMark("ユーザー"), "ユーザー");
  });
});

describe("countEffectiveChars", () => {
  it("小書き文字を除いてカウントする", () => {
    // ディレクトリ → ディレクトリー (7文字中 ィ を除く → 6)
    assert.equal(countEffectiveChars("ディレクトリ"), 6);
  });

  it("長音符を1文字としてカウントする", () => {
    // ユーザー: ユ ー ザ ー → 4 (小書き文字なし)
    assert.equal(countEffectiveChars("ユーザー"), 4);
  });

  it("長音符なしの語でも正規化してカウントする", () => {
    // ユーザ → ユーザー → 4
    assert.equal(countEffectiveChars("ユーザ"), 4);
  });

  it("小書き文字のみで構成される部分を正しく除外する", () => {
    // ドア → ドアー → 3 (小書き文字なし)
    assert.equal(countEffectiveChars("ドア"), 3);
  });
});

describe("classify", () => {
  // 子音 + -er/-or/-ar → requireMark
  it("子音 + -er → er-or-ar, requireMark", () => {
    const c = classify("compiler");
    assert.equal(c?.name, "er-or-ar");
    assert.equal(c?.principle, "requireMark");
  });

  it("子音 + -or → er-or-ar, requireMark", () => {
    const c = classify("monitor");
    assert.equal(c?.name, "er-or-ar");
    assert.equal(c?.principle, "requireMark");
  });

  it("子音 + -ar → er-or-ar, requireMark", () => {
    const c = classify("calendar");
    assert.equal(c?.name, "er-or-ar");
    assert.equal(c?.principle, "requireMark");
  });

  // -y（-ry, -ty, -phy 以外）→ requireMark
  it("-cy → y, requireMark", () => {
    const c = classify("policy");
    assert.equal(c?.name, "y");
    assert.equal(c?.principle, "requireMark");
  });

  it("-gy → y, requireMark", () => {
    const c = classify("technology");
    assert.equal(c?.name, "y");
    assert.equal(c?.principle, "requireMark");
  });

  // -ry → requireNoMark
  it("-ory → ry, requireNoMark", () => {
    const c = classify("memory");
    assert.equal(c?.name, "ry");
    assert.equal(c?.principle, "requireNoMark");
  });

  it("-ary → ry, requireNoMark", () => {
    const c = classify("library");
    assert.equal(c?.name, "ry");
    assert.equal(c?.principle, "requireNoMark");
  });

  // -ty → requireNoMark
  it("-ty → ty, requireNoMark", () => {
    const c = classify("property");
    assert.equal(c?.name, "ty");
    assert.equal(c?.principle, "requireNoMark");
  });

  it("-bility → ty, requireNoMark", () => {
    const c = classify("scalability");
    assert.equal(c?.name, "ty");
    assert.equal(c?.principle, "requireNoMark");
  });

  // -phy → requireNoMark
  it("-phy → phy, requireNoMark", () => {
    const c = classify("typography");
    assert.equal(c?.name, "phy");
    assert.equal(c?.principle, "requireNoMark");
  });

  // -ure → requireNoMark
  it("-ure → ure, requireNoMark", () => {
    const c = classify("architecture");
    assert.equal(c?.name, "ure");
    assert.equal(c?.principle, "requireNoMark");
  });

  // 母音 + -er/-or/-ar → requireNoMark
  it("母音 + -ear → r-vowels, requireNoMark", () => {
    const c = classify("clear");
    assert.equal(c?.name, "r-vowels");
    assert.equal(c?.principle, "requireNoMark");
  });

  it("母音 + -oor → r-vowels, requireNoMark", () => {
    const c = classify("door");
    assert.equal(c?.name, "r-vowels");
    assert.equal(c?.principle, "requireNoMark");
  });

  // Fallback
  it("english が null の場合は null", () => {
    assert.equal(classify(null), null);
  });

  it("分類不能な英語語尾は null", () => {
    assert.equal(classify("table"), null);
  });
});
