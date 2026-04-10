import assert from "node:assert/strict";
import { lookup } from "../../../dictionary/tools/lookup.js";

describe("lookup", () => {
  it("登録済みの語のファイル名と配列名を返す", () => {
    const result = lookup("ユーザー");
    assert.deepEqual(result, { file: "dict-er-or-ar.js", key: "requireMark" });
  });

  it("長音符トグルで検索できる", () => {
    // メモリ は dict-long.js に登録、メモリー で検索してもヒット
    const result = lookup("メモリー");
    assert.deepEqual(result, { file: "dict-long.js", key: "requireNoMark" });
  });

  it("未登録の語は null を返す", () => {
    const result = lookup("カタカナ");
    assert.equal(result, null);
  });
});
