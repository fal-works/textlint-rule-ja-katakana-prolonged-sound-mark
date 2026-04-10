import assert from "node:assert/strict";
import { lookup } from "../../../dictionary/tools/lookup.js";

describe("lookup", () => {
  it("登録済みの語のファイル名を返す", () => {
    const file = lookup("ユーザー");
    assert.equal(file, "dict-regular-with-mark.js");
  });

  it("長音符トグルで検索できる", () => {
    // メモリ は dict-regular-without-mark.js に登録、メモリー で検索してもヒット
    const file = lookup("メモリー");
    assert.equal(file, "dict-regular-without-mark.js");
  });

  it("未登録の語は null を返す", () => {
    const file = lookup("ランナー");
    assert.equal(file, null);
  });
});
