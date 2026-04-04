import { correctForm } from "./dictionary.js";

// 辞書照合のためのトークナイザ: カタカナ連続列を1語として切り出す。
// 中黒（・）や繰返し記号（ヽヾ）は語の区切りとして除外し、
// 長音符（ー）は語の構成要素として含める。
// 半角カタカナ（U+FF65-FF9F）はスコープ外。
const KATAKANA_RE = /[\u30A1-\u30FA\u30FC]+/gv;

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @returns {import("@textlint/types").TextlintRuleReportHandler}
 */
function createVisitor(context) {
  const { Syntax, report, RuleError, fixer, getSource, locator } = context;
  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      for (const match of text.matchAll(KATAKANA_RE)) {
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
