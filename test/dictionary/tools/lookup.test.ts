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
});
