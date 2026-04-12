import assert from "node:assert/strict";
import { lookup } from "../../../dictionary/tools/lookup.ts";

describe("lookup", () => {
  it("登録済みの語のカテゴリと配列名を返す", () => {
    const result = lookup("ユーザー");
    assert.deepEqual(result, { category: "er-or-ar", key: "requireMark" });
  });

  it("長音符トグルで検索できる", () => {
    // メモリ は ry カテゴリに登録、メモリー で検索してもヒット
    const result = lookup("メモリー");
    assert.deepEqual(result, { category: "ry", key: "requireNoMark" });
  });

  it("未登録の語は null を返す", () => {
    const result = lookup("カタカナ");
    assert.equal(result, null);
  });

  it("variants として登録された派生語も引ける（基幹語と同じ category/key）", () => {
    // アンインストーラー は インストーラー の variants として dict-er-or-ar に登録
    const result = lookup("アンインストーラー");
    assert.deepEqual(result, { category: "er-or-ar", key: "requireMark" });
  });

  it("variants の派生語は長音符トグルでも引ける", () => {
    const result = lookup("アンインストーラ");
    assert.deepEqual(result, { category: "er-or-ar", key: "requireMark" });
  });

  it("requireNoMark 側の variants も引ける", () => {
    // デシリアライザ は シリアライザ の variants として dict-er-or-ar (requireNoMark) に登録
    const result = lookup("デシリアライザ");
    assert.deepEqual(result, { category: "er-or-ar", key: "requireNoMark" });
  });

  it("allowBoth に移した偽同定防止語も独立エントリとして引ける", () => {
    // ブリーダー は allowBoth として dict-er-or-ar に登録され、リーダー からは cross-ref される
    const result = lookup("ブリーダー");
    assert.deepEqual(result, { category: "er-or-ar", key: "allowBoth" });
  });

  it("cross-ref から requireMark に昇格した語も引ける", () => {
    const result = lookup("サポーター");
    assert.deepEqual(result, { category: "er-or-ar", key: "requireMark" });
  });

  it("dict-ure 側の variants も引ける", () => {
    // インフラストラクチャ は ストラクチャ の variants として dict-ure (requireNoMark) に登録
    const result = lookup("インフラストラクチャ");
    assert.deepEqual(result, { category: "ure", key: "requireNoMark" });
  });
});
