/**
 * 両方許容する語。
 *
 * 規則に反するが慣例として許容したいほうの語を管理する。
 * ビルド時に登録対象には含まれないが、他ソースとの重複検知に使用する。
 * 各エントリのコメント形式: 英語原語 (語尾パターン)
 *
 * @type {import("./builder.js").DictSource}
 */
export default { rule: "allow-both", words: [
  "アクセラレータ",   // accelerator (-or)
  "スカラ",           // scalar (-ar)
] };
