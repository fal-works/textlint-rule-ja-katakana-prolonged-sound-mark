import assert from "node:assert/strict";
import { normalizeWithMark, countEffectiveChars, applyMsPrinciple } from "../../../dictionary/tools/utils.js";

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

describe("applyMsPrinciple", () => {
  it("-er 語尾は withMark: true, rationale: er-or-ar", () => {
    const result = applyMsPrinciple("コンパイラ", "compiler");
    assert.equal(result.withMark, true);
    assert.equal(result.rationale, "er-or-ar");
  });

  it("-or 語尾は withMark: true, rationale: er-or-ar", () => {
    const result = applyMsPrinciple("モニター", "monitor");
    assert.equal(result.withMark, true);
    assert.equal(result.rationale, "er-or-ar");
  });

  it("-ar 語尾は withMark: true, rationale: er-or-ar", () => {
    const result = applyMsPrinciple("カレンダー", "calendar");
    assert.equal(result.withMark, true);
    assert.equal(result.rationale, "er-or-ar");
  });

  it("短い語 (実効4文字未満) は withMark: true, rationale: short", () => {
    // ドアー → 3文字
    const result = applyMsPrinciple("ドア", null);
    assert.equal(result.withMark, true);
    assert.equal(result.rationale, "short");
  });

  it("長い語 (er/or/ar 以外, 実効4文字以上) は withMark: false, rationale: long", () => {
    const result = applyMsPrinciple("メモリ", "memory");
    assert.equal(result.withMark, false);
    assert.equal(result.rationale, "long");
  });

  it("english が null の場合は文字数のみで判定", () => {
    const result = applyMsPrinciple("ディレクトリ", null);
    assert.equal(result.withMark, false);
    assert.equal(result.rationale, "long");
  });
});
