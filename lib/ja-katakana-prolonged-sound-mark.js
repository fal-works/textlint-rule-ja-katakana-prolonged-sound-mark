import { correctForm } from "./dictionary.js";

// カタカナ（ァ-ヺ）と長音符（ー）のみにマッチ
// \u30A0（゠）, \u30FB（・）, \u30FD-\u30FF（ヽヾヿ）は除外
const KATAKANA_RE = /[\u30A1-\u30FA\u30FC]+/g;

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
