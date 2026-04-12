import assert from "node:assert/strict";
import type { DictSource } from "../../dictionary/types.ts";
import { validate, generateWrongForms, renderModule } from "../../dictionary/builder.ts";

/** テスト用の sources Map を構築するヘルパー。 */
function sources(entries: Record<string, DictSource> = {}): Map<string, DictSource> {
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
    assert.match(errors[0]!, /src.*ユーザ.*ー/);
  });

  it("requireNoMark に長音符ありの語があればエラー", () => {
    const errors = validate(sources({
      src: { requireNoMark: ["メモリー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(errors[0]!, /src.*メモリー.*ー/);
  });

  it("同一ソース内の重複を検知", () => {
    const errors = validate(sources({
      src: { requireMark: ["ユーザー", "サーバー", "ユーザー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(errors[0]!, /ユーザー.*src 内で/);
  });

  it("ソース間の重複を検知", () => {
    const errors = validate(sources({
      a: { requireMark: ["ユーザー"] },
      b: { requireMark: ["ユーザー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(errors[0]!, /ユーザー.*a と b の間で/);
  });

  it("allowBoth と他ソースの重複を検知", () => {
    const errors = validate(sources({
      a: { requireMark: ["ユーザー"] },
      b: { allowBoth: ["ユーザー"] },
    }));
    assert.equal(errors.length, 1);
    assert.match(errors[0]!, /ユーザー/);
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

  // --- DictEntry オブジェクト形式 ---

  it("DictEntry オブジェクト形式の正常な入力でエラーなし", () => {
    const errors = validate(sources({
      src: {
        requireMark: [
          { word: "インストーラー", derived: ["アンインストーラー"] },
          { word: "リーダー", falsePositives: ["ブリーダー"] },
        ],
        requireNoMark: [
          { word: "シリアライザ", derived: ["デシリアライザ"] },
        ],
      },
    }));
    assert.deepEqual(errors, []);
  });

  // --- 付随語の MarkPolicy 整合性 ---

  it("requireMark の付随語が長音符なしならエラー", () => {
    const errors = validate(sources({
      src: {
        requireMark: [
          { word: "インストーラー", derived: ["アンインストーラ"] },
        ],
      },
    }));
    assert.ok(errors.some((e) => /アンインストーラ.*付随語.*ー.*終わっていません/.test(e)));
  });

  it("requireNoMark の付随語が長音符ありならエラー", () => {
    const errors = validate(sources({
      src: {
        requireNoMark: [
          { word: "シリアライザ", derived: ["デシリアライザー"] },
        ],
      },
    }));
    assert.ok(errors.some((e) => /デシリアライザー.*付随語.*ー.*終わっています/.test(e)));
  });

  // --- 付随語の後方一致関係 ---

  it("付随語の誤表記が基幹語の誤表記で終わらなければエラー", () => {
    const errors = validate(sources({
      src: {
        requireMark: [
          { word: "インストーラー", derived: ["ダウンローダー"] },
        ],
      },
    }));
    assert.ok(errors.some((e) => /ダウンローダー.*誤表記.*インストーラー.*終わっていません/.test(e)));
  });

  it("falsePositives も後方一致関係を検証する", () => {
    const errors = validate(sources({
      src: {
        requireMark: [
          { word: "リーダー", falsePositives: ["マネージャー"] },
        ],
      },
    }));
    assert.ok(errors.some((e) => /マネージャー.*誤表記.*リーダー.*終わっていません/.test(e)));
  });

  // --- 付随語の重複検知 ---

  it("付随語が他エントリと重複していればエラー", () => {
    const errors = validate(sources({
      a: {
        requireMark: [
          "ブリーダー",
          { word: "リーダー", falsePositives: ["ブリーダー"] },
        ],
      },
    }));
    assert.ok(errors.some((e) => /重複.*ブリーダー/));
  });

  it("付随語がソース間で重複していればエラー", () => {
    const errors = validate(sources({
      a: { requireMark: ["アンインストーラー"] },
      b: {
        requireMark: [
          { word: "インストーラー", derived: ["アンインストーラー"] },
        ],
      },
    }));
    assert.ok(errors.some((e) => /重複.*アンインストーラー/.test(e)));
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

  it("DictEntry の派生語・偽同定防止語の誤表記も含む", () => {
    const result = generateWrongForms(sources({
      src: {
        requireMark: [
          { word: "インストーラー", derived: ["アンインストーラー"] },
        ],
      },
    }));
    // 文字数降順: アンインストーラ(8) > インストーラ(6)
    assert.deepEqual(result, ["アンインストーラ", "インストーラ"]);
  });

  it("結果が文字数の降順でソートされる", () => {
    const result = generateWrongForms(sources({
      src: {
        requireMark: ["サーバー", "インストーラー"],
        requireNoMark: ["メモリ"],
      },
    }));
    for (let i = 1; i < result.length; i++) {
      assert.ok(
        result[i - 1]!.length >= result[i]!.length,
        `${result[i - 1]} (${result[i - 1]!.length}) should be >= ${result[i]} (${result[i]!.length})`,
      );
    }
  });
});

describe("renderModule", () => {
  it("有効な ES モジュールを生成する", () => {
    const output = renderModule(["ユーザ", "メモリー"]);
    assert.match(output, /export const wrongForms = \[/);
    assert.match(output, /"ユーザ"/);
    assert.match(output, /"メモリー"/);
  });
});
