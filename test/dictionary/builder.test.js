import assert from "node:assert/strict";
import { validate, generateWrongForms, renderModule } from "../../dictionary/builder.js";

/**
 * テスト用の sources Map を構築するヘルパー。
 * @param {Record<string, import("../../dictionary/builder.js").DictSource>} entries
 * @returns {Map<string, import("../../dictionary/builder.js").DictSource>}
 */
function sources(entries = {}) {
  return new Map(Object.entries(entries));
}

describe("validate", () => {
  it("正常な入力でエラーなし", () => {
    const errors = validate(sources({
      a: { rule: "require-mark", words: ["ユーザー", "サーバー"] },
      b: { rule: "require-no-mark", words: ["メモリ", "ディレクトリ"] },
      c: { rule: "no-check", words: ["コンパイラ", "サマリー"] },
      d: { rule: "allow-both", words: ["スカラ"] },
    }));
    assert.deepEqual(errors, []);
  });

  it("require-mark に長音符なしの語があればエラー", () => {
    const errors = validate(sources({
      src: { rule: "require-mark", words: ["ユーザ"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(/** @type {string} */ (errors[0]), /src.*ユーザ.*ー/);
  });

  it("require-no-mark に長音符ありの語があればエラー", () => {
    const errors = validate(sources({
      src: { rule: "require-no-mark", words: ["メモリー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(/** @type {string} */ (errors[0]), /src.*メモリー.*ー/);
  });

  it("同一ソース内の重複を検知", () => {
    const errors = validate(sources({
      src: { rule: "require-mark", words: ["ユーザー", "サーバー", "ユーザー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(/** @type {string} */ (errors[0]), /ユーザー.*src 内で/);
  });

  it("ソース間の重複を検知", () => {
    const errors = validate(sources({
      a: { rule: "require-mark", words: ["ユーザー"] },
      b: { rule: "no-check", words: ["ユーザー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(/** @type {string} */ (errors[0]), /ユーザー.*a と b の間で/);
  });

  it("allow-both と他ソースの重複を検知", () => {
    const errors = validate(sources({
      a: { rule: "require-mark", words: ["ユーザー"] },
      b: { rule: "allow-both", words: ["ユーザー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(/** @type {string} */ (errors[0]), /ユーザー/);
  });

  it("no-check は長音符の有無をチェックしない", () => {
    const errors1 = validate(sources({
      src: { rule: "no-check", words: ["コンパイラ"] },
    }));
    const errors2 = validate(sources({
      src: { rule: "no-check", words: ["サマリー"] },
    }));
    assert.deepEqual(errors1, []);
    assert.deepEqual(errors2, []);
  });

  it("allow-both は長音符の有無をチェックしない", () => {
    const errors = validate(sources({
      src: { rule: "allow-both", words: ["スカラ"] },
    }));
    assert.deepEqual(errors, []);
  });

  it("長音符トグル形が他ソースに存在すれば衝突エラー", () => {
    const errors = validate(sources({
      a: { rule: "require-mark", words: ["ユーザー"] },
      b: { rule: "allow-both", words: ["ユーザ"] },
    }));
    assert.equal(errors.length, 2);
    assert.ok(errors.some((e) => /衝突.*ユーザー.*ユーザ/.test(e)));
    assert.ok(errors.some((e) => /衝突.*ユーザ.*ユーザー/.test(e)));
  });

  it("allow-both 同士でも長音符トグル形の衝突を検知", () => {
    const errors = validate(sources({
      a: { rule: "allow-both", words: ["スカラ"] },
      b: { rule: "allow-both", words: ["スカラー"] },
    }));
    assert.equal(errors.length, 2);
    assert.ok(errors.some((e) => /衝突.*スカラ[^ー].*スカラー/.test(e)));
    assert.ok(errors.some((e) => /衝突.*スカラー.*スカラ[^ー]/.test(e)));
  });

  it("複数エラーをすべて報告", () => {
    const errors = validate(sources({
      src: { rule: "require-mark", words: ["ユーザ", "サーバ"] },
    }));
    assert.equal(errors.length, 2);
  });
});

describe("generateWrongForms", () => {
  it("require-mark の語は長音符を削って誤表記にする", () => {
    const result = generateWrongForms(sources({
      src: { rule: "require-mark", words: ["ユーザー"] },
    }));
    assert.deepEqual(result, ["ユーザ"]);
  });

  it("require-no-mark の語は長音符を足して誤表記にする", () => {
    const result = generateWrongForms(sources({
      src: { rule: "require-no-mark", words: ["メモリ"] },
    }));
    assert.deepEqual(result, ["メモリー"]);
  });

  it("no-check も同様にtoggleする", () => {
    const result = generateWrongForms(sources({
      src: { rule: "no-check", words: ["コンパイラ", "サマリー"] },
    }));
    assert.deepEqual(result, ["コンパイラー", "サマリ"]);
  });

  it("allow-both は含まない", () => {
    const result = generateWrongForms(sources({
      src: { rule: "allow-both", words: ["スカラ"] },
    }));
    assert.deepEqual(result, []);
  });
});

describe("renderModule", () => {
  it("有効な ES モジュールを生成する", () => {
    const output = renderModule(["ユーザ", "メモリー"]);
    assert.match(output, /export const wrongForms = new Set\(/);
    assert.match(output, /"ユーザ"/);
    assert.match(output, /"メモリー"/);
  });
});
