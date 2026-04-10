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
      a: { requireMark: ["ユーザー", "サーバー"] },
      b: { requireNoMark: ["メモリ", "ディレクトリ"] },
      c: { requireNoMark: ["コンパイラ"] },
      c2: { requireMark: ["サマリー"] },
      d: { allowBoth: ["スカラ"] },
    }));
    assert.deepEqual(errors, []);
  });

  it("requireMark に長音符なしの語があればエラー", () => {
    const errors = validate(sources({
      src: { requireMark: ["ユーザ"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(/** @type {string} */ (errors[0]), /src.*ユーザ.*ー/);
  });

  it("requireNoMark に長音符ありの語があればエラー", () => {
    const errors = validate(sources({
      src: { requireNoMark: ["メモリー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(/** @type {string} */ (errors[0]), /src.*メモリー.*ー/);
  });

  it("同一ソース内の重複を検知", () => {
    const errors = validate(sources({
      src: { requireMark: ["ユーザー", "サーバー", "ユーザー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(/** @type {string} */ (errors[0]), /ユーザー.*src 内で/);
  });

  it("ソース間の重複を検知", () => {
    const errors = validate(sources({
      a: { requireMark: ["ユーザー"] },
      b: { requireMark: ["ユーザー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(/** @type {string} */ (errors[0]), /ユーザー.*a と b の間で/);
  });

  it("allowBoth と他ソースの重複を検知", () => {
    const errors = validate(sources({
      a: { requireMark: ["ユーザー"] },
      b: { allowBoth: ["ユーザー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(/** @type {string} */ (errors[0]), /ユーザー/);
  });

  it("allowBoth は長音符の有無をチェックしない", () => {
    const errors = validate(sources({
      src: { allowBoth: ["スカラ"] },
    }));
    assert.deepEqual(errors, []);
  });

  it("長音符トグル形が他ソースに存在すれば衝突エラー", () => {
    const errors = validate(sources({
      a: { requireMark: ["ユーザー"] },
      b: { allowBoth: ["ユーザ"] },
    }));
    assert.equal(errors.length, 2);
    assert.ok(errors.some((e) => /衝突.*ユーザー.*ユーザ/.test(e)));
    assert.ok(errors.some((e) => /衝突.*ユーザ.*ユーザー/.test(e)));
  });

  it("allowBoth 同士でも長音符トグル形の衝突を検知", () => {
    const errors = validate(sources({
      a: { allowBoth: ["スカラ"] },
      b: { allowBoth: ["スカラー"] },
    }));
    assert.equal(errors.length, 2);
    assert.ok(errors.some((e) => /衝突.*スカラ[^ー].*スカラー/.test(e)));
    assert.ok(errors.some((e) => /衝突.*スカラー.*スカラ[^ー]/.test(e)));
  });

  it("複数エラーをすべて報告", () => {
    const errors = validate(sources({
      src: { requireMark: ["ユーザ", "サーバ"] },
    }));
    assert.equal(errors.length, 2);
  });
});

describe("generateWrongForms", () => {
  it("requireMark の語は長音符を削って誤表記にする", () => {
    const result = generateWrongForms(sources({
      src: { requireMark: ["ユーザー"] },
    }));
    assert.deepEqual(result, ["ユーザ"]);
  });

  it("requireNoMark の語は長音符を足して誤表記にする", () => {
    const result = generateWrongForms(sources({
      src: { requireNoMark: ["メモリ"] },
    }));
    assert.deepEqual(result, ["メモリー"]);
  });

  it("allowBoth は含まない", () => {
    const result = generateWrongForms(sources({
      src: { allowBoth: ["スカラ"] },
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
