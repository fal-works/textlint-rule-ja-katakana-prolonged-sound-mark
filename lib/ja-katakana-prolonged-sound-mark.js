import { wrongForms } from "./dictionary.js";

/**
 * 辞書照合のためのトークナイザ。カタカナ連続列を1語として切り出す。
 * 
 * - 中黒 `・` や繰返し記号 `ヽヾ` は語の区切りとして除外する
 * - 長音符 `ー` は語の構成要素として含める
 * - 半角カタカナ (U+FF65-FF9F) はスコープ外
 */
const katakanaWordPattern = /[\u30A1-\u30FA\u30FC]+/gv;

/**
 * 入力された単語を正表記に正規化する。
 * 
 * - 誤表記として判定された場合、末尾が `ー` なら削り、そうでなければ付ける。
 * - 辞書にない語（すでに正表記の場合も含む）には `undefined` を返す。
 *
 * @param {string} word - 検査対象のカタカナ単語
 * @returns {string | undefined} 正規化済みの単語。訂正不要な場合は `undefined`
 */
function correctForm(word) {
  if (!wrongForms.has(word)) return undefined;
  return word[word.length - 1] === "ー"
    ? word.slice(0, -1)
    : word + "ー";
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
        const correct = correctForm(word);
        if (!correct) continue;
        const index = match.index;
        report(
          node,
          new RuleError(`「${word}」は「${correct}」と表記してください。`, {
            padding: locator.range([index, index + word.length]),
            fix: fixer.replaceTextRange(
              [index, index + word.length],
              correct
            ),
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
