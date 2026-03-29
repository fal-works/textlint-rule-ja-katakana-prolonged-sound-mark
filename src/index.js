import dictionary from "./dictionary.js";

// カタカナ・長音符にマッチ（ー は \u30FC）
const KATAKANA_RE = /[\u30A0-\u30FF]+/g;

function createVisitor(context) {
  const { Syntax, report, RuleError, fixer, getSource, locator } = context;
  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      KATAKANA_RE.lastIndex = 0;
      let match;
      while ((match = KATAKANA_RE.exec(text)) !== null) {
        const word = match[0];
        if (!Object.prototype.hasOwnProperty.call(dictionary, word)) continue;
        const correct = dictionary[word];
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

export default {
  linter: createVisitor,
  fixer: createVisitor,
};
