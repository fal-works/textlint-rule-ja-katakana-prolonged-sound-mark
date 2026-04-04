import assert from "node:assert/strict";
import { correctForm } from "../../lib/dictionary.js";

describe("correctForm", () => {
  it("末尾に「ー」がない辞書語 → 「ー」を付加", () => {
    assert.equal(correctForm("ユーザ"), "ユーザー");
  });
  it("末尾に「ー」がある辞書語 → 「ー」を削除", () => {
    assert.equal(correctForm("メモリー"), "メモリ");
  });
  it("辞書にない語 → undefined", () => {
    assert.equal(correctForm("テーブル"), undefined);
  });
});
