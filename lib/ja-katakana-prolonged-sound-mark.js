import { wrongForms } from "./dictionary.js";

const wrongFormsSet = new Set(wrongForms);

/**
 * 辞書照合のためのトークナイザ。カタカナ連続列を1語として切り出す。
 *
 * - 中黒 `・` や繰返し記号 `ヽヾ` は語の区切りとして除外する
 * - 長音符 `ー` は語の構成要素として含める
 * - 半角カタカナ (U+FF65-FF9F) はスコープ外
 */
const katakanaWordPattern = /[\u30A1-\u30FA\u30FC]+/gv;

/**
 * 末尾長音符をトグルする（付いていれば削除、なければ付与）。
 *
 * @param {string} word
 * @returns {string}
 */
function toggle(word) {
  return word[word.length - 1] === "ー" ? word.slice(0, -1) : word + "ー";
}

/**
 * 入力された単語を照合し、検出すべき誤表記部分とその正表記を返す。
 *
 * 1. 完全一致: 語全体が誤表記辞書にあれば、語全体を訂正対象とする
 * 2. 後方一致: 語の末尾が辞書中のいずれかの誤表記と一致すれば、その末尾部分を訂正対象とする
 *    - `wrongForms` は文字数降順ソート済みなので、先頭ヒットが最長一致
 *    - `word.length > wf.length` 条件により完全一致は除外（優先度は上の完全一致ループで処理済み）
 * 3. いずれも一致しなければ `undefined`
 *
 * 戻り値の `matched` は入力語内の訂正対象部分、`corrected` はその正表記。
 * 完全一致時は `matched === word` なので、呼び出し側は range を
 * `[end - matched.length, end]` で統一的に扱える。
 *
 * @param {string} word - 検査対象のカタカナ単語
 * @returns {{ matched: string, corrected: string } | undefined}
 */
function correctForm(word) {
  if (wrongFormsSet.has(word)) {
    return { matched: word, corrected: toggle(word) };
  }
  for (const wf of wrongForms) {
    if (word.length > wf.length && word.endsWith(wf)) {
      return { matched: wf, corrected: toggle(wf) };
    }
  }
  return undefined;
}

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @returns {import("@textlint/types").TextlintRuleReportHandler}
 */
function createVisitor(context) {
  const { Syntax, report, RuleError, fixer, getSource, locator } = context;
  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      for (const match of text.matchAll(katakanaWordPattern)) {
        const word = match[0];
        const result = correctForm(word);
        if (!result) continue;
        const { matched, corrected } = result;
        const end = match.index + word.length;
        const start = end - matched.length;
        report(
          node,
          new RuleError(`「${matched}」は「${corrected}」と表記してください。`, {
            padding: locator.range([start, end]),
            fix: fixer.replaceTextRange([start, end], corrected),
          })
        );
      }
    },
  };
}

/** @type {import("@textlint/types").TextlintFixableRuleModule} */
export default {
  linter: createVisitor,
  fixer: createVisitor,
};
