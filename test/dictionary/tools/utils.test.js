import assert from "node:assert/strict";
import { normalizeWithMark, countEffectiveChars, applyPrinciple } from "../../../dictionary/tools/utils.js";

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

describe("applyPrinciple", () => {
  // Rule 1: 子音 + -er/-or/-ar → あり
  it("子音 + -er → withMark: true, rationale: er-or-ar", () => {
    const result = applyPrinciple("コンパイラ", "compiler");
    assert.equal(result.withMark, true);
    assert.equal(result.rationale, "er-or-ar");
  });

  it("子音 + -or → withMark: true, rationale: er-or-ar", () => {
    const result = applyPrinciple("モニター", "monitor");
    assert.equal(result.withMark, true);
    assert.equal(result.rationale, "er-or-ar");
  });

  it("子音 + -ar → withMark: true, rationale: er-or-ar", () => {
    const result = applyPrinciple("カレンダー", "calendar");
    assert.equal(result.withMark, true);
    assert.equal(result.rationale, "er-or-ar");
  });

  // Rule 2: -y（-ry, -ty, -phy 以外）→ あり
  it("-cy → withMark: true, rationale: y", () => {
    const result = applyPrinciple("ポリシー", "policy");
    assert.equal(result.withMark, true);
    assert.equal(result.rationale, "y");
  });

  it("-gy → withMark: true, rationale: y", () => {
    const result = applyPrinciple("テクノロジー", "technology");
    assert.equal(result.withMark, true);
    assert.equal(result.rationale, "y");
  });

  // Rule 3: -ry → なし
  it("-ory → withMark: false, rationale: ry", () => {
    const result = applyPrinciple("メモリ", "memory");
    assert.equal(result.withMark, false);
    assert.equal(result.rationale, "ry");
  });

  it("-ary → withMark: false, rationale: ry", () => {
    const result = applyPrinciple("ライブラリ", "library");
    assert.equal(result.withMark, false);
    assert.equal(result.rationale, "ry");
  });

  // Rule 4: -ty → なし
  it("-ty → withMark: false, rationale: ty", () => {
    const result = applyPrinciple("プロパティ", "property");
    assert.equal(result.withMark, false);
    assert.equal(result.rationale, "ty");
  });

  it("-bility → withMark: false, rationale: ty", () => {
    const result = applyPrinciple("スケーラビリティ", "scalability");
    assert.equal(result.withMark, false);
    assert.equal(result.rationale, "ty");
  });

  // Rule 5: -phy → なし
  it("-phy → withMark: false, rationale: phy", () => {
    const result = applyPrinciple("タイポグラフィ", "typography");
    assert.equal(result.withMark, false);
    assert.equal(result.rationale, "phy");
  });

  // Rule 6: -ure → なし
  it("-ure → withMark: false, rationale: ure", () => {
    const result = applyPrinciple("アーキテクチャ", "architecture");
    assert.equal(result.withMark, false);
    assert.equal(result.rationale, "ure");
  });

  // Rule 7: 母音 + -er/-or/-ar → なし
  it("母音 + -ear → withMark: false, rationale: r-vowels", () => {
    const result = applyPrinciple("クリア", "clear");
    assert.equal(result.withMark, false);
    assert.equal(result.rationale, "r-vowels");
  });

  it("母音 + -oor → withMark: false, rationale: r-vowels", () => {
    const result = applyPrinciple("ドア", "door");
    assert.equal(result.withMark, false);
    assert.equal(result.rationale, "r-vowels");
  });

  // Fallback
  it("english が null の場合は withMark: null, rationale: null", () => {
    const result = applyPrinciple("ディレクトリ", null);
    assert.equal(result.withMark, null);
    assert.equal(result.rationale, null);
  });

  it("分類不能な英語語尾は withMark: null, rationale: null", () => {
    const result = applyPrinciple("テーブル", "table");
    assert.equal(result.withMark, null);
    assert.equal(result.rationale, null);
  });
});
