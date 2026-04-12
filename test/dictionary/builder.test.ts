import assert from "node:assert/strict";
import type { DictSource } from "../../dictionary/types.ts";
import { validate, generateForms, renderModule } from "../../dictionary/builder.ts";

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
          { word: "インストーラー", variants: ["アンインストーラー"] },
          { word: "リーダー", falsePositives: ["ブリーダー"] },
        ],
        requireNoMark: [
          { word: "シリアライザ", variants: ["デシリアライザ"] },
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
          { word: "インストーラー", variants: ["アンインストーラ"] },
        ],
      },
    }));
    assert.ok(errors.some((e) => /アンインストーラ.*付随語.*ー.*終わっていません/.test(e)));
  });

  it("requireNoMark の付随語が長音符ありならエラー", () => {
    const errors = validate(sources({
      src: {
        requireNoMark: [
          { word: "シリアライザ", variants: ["デシリアライザー"] },
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
          { word: "インストーラー", variants: ["ダウンローダー"] },
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
          { word: "インストーラー", variants: ["アンインストーラー"] },
        ],
      },
    }));
    assert.ok(errors.some((e) => /重複.*アンインストーラー/.test(e)));
  });

  // --- 単体エントリの冗長性検査 ---

  it("単体エントリが別エントリの後方一致で検出可能ならエラー", () => {
    const errors = validate(sources({
      src: {
        requireMark: ["インストーラー", "アンインストーラー"],
      },
    }));
    assert.ok(errors.some((e) =>
      /アンインストーラー.*インストーラー.*後方一致.*明示登録/.test(e)
    ));
  });

  it("ソース間でも単体エントリの冗長性を検知", () => {
    const errors = validate(sources({
      a: { requireMark: ["インストーラー"] },
      b: { requireMark: ["アンインストーラー"] },
    }));
    assert.ok(errors.some((e) =>
      /アンインストーラー.*インストーラー.*後方一致/.test(e)
    ));
  });

  it("variants に移行していれば冗長性エラーは発生しない", () => {
    const errors = validate(sources({
      src: {
        requireMark: [
          { word: "インストーラー", variants: ["アンインストーラー"] },
        ],
      },
    }));
    assert.deepEqual(errors, []);
  });

  it("falsePositives に登録していれば冗長性エラーは発生しない", () => {
    const errors = validate(sources({
      src: {
        requireMark: [
          { word: "リーダー", falsePositives: ["ブリーダー"] },
        ],
      },
    }));
    assert.deepEqual(errors, []);
  });
});

describe("generateForms", () => {
  it("requireMark の語は長音符を削って誤表記にする", () => {
    const result = generateForms(sources({
      src: { requireMark: ["ユーザー"] },
    }));
    assert.deepEqual(result, {
      wrongForms: ["ユーザ"],
      correctForms: ["ユーザー"],
    });
  });

  it("requireNoMark の語は長音符を足して誤表記にする", () => {
    const result = generateForms(sources({
      src: { requireNoMark: ["メモリ"] },
    }));
    assert.deepEqual(result, {
      wrongForms: ["メモリー"],
      correctForms: ["メモリ"],
    });
  });

  it("allowBoth は含まない", () => {
    const result = generateForms(sources({
      src: { allowBoth: ["スカラ"] },
    }));
    assert.deepEqual(result, {
      wrongForms: [],
      correctForms: ["スカラー", "スカラ"],
    });
  });

  it("DictEntry の派生語・偽同定防止語の誤表記も含む", () => {
    const result = generateForms(sources({
      src: {
        requireMark: [
          { word: "インストーラー", variants: ["アンインストーラー"], falsePositives: ["ブリーダー"] },
        ],
      },
    }));
    assert.deepEqual(result.wrongForms, ["アンインストーラ", "インストーラ", "ブリーダ"]);
    assert.deepEqual(result.correctForms, ["アンインストーラー", "インストーラー"]);
  });

  it("correctForms はトップレベル語・variants・allowBoth 両形を含む", () => {
    const result = generateForms(sources({
      src: {
        requireMark: [{ word: "インストーラー", variants: ["アンインストーラー"] }],
        requireNoMark: ["メモリ"],
        allowBoth: ["スカラ"],
      },
    }));
    assert.deepEqual(result.correctForms, [
      "アンインストーラー",
      "インストーラー",
      "スカラー",
      "メモリ",
      "スカラ",
    ]);
  });

  it("結果が文字数の降順でソートされる", () => {
    const result = generateForms(sources({
      src: {
        requireMark: ["サーバー", "インストーラー"],
        requireNoMark: ["メモリ"],
        allowBoth: ["スカラ"],
      },
    }));
    for (const forms of [result.wrongForms, result.correctForms]) {
      for (let i = 1; i < forms.length; i++) {
        assert.ok(
          forms[i - 1]!.length >= forms[i]!.length,
          `${forms[i - 1]} (${forms[i - 1]!.length}) should be >= ${forms[i]} (${forms[i]!.length})`,
        );
      }
    }
  });
});

describe("renderModule", () => {
  it("有効な ES モジュールを生成する", () => {
    const output = renderModule({
      wrongForms: ["ユーザ", "メモリー"],
      correctForms: ["ユーザー", "メモリ"],
    });
    assert.match(output, /export const wrongForms = \[/);
    assert.match(output, /export const correctForms = \[/);
    assert.match(output, /"ユーザ"/);
    assert.match(output, /"メモリー"/);
    assert.match(output, /"ユーザー"/);
    assert.match(output, /"メモリ"/);
  });
});
