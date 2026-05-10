import { wrongForms, correctForms } from "./dictionary.js";

const forms = [
  ...wrongForms.map((form) => ({ form, wrong: true })),
  ...correctForms.map((form) => ({ form, wrong: false })),
].toSorted((a, b) => b.form.length - a.form.length);

/**
 * 辞書照合のためのトークナイザー。カタカナ連続列を1語として切り出す。
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
 * 語尾が `forms` 中のいずれかに一致すれば、最長一致を採用する。
 * - 一致先が誤表記候補なら、その部分を正表記へ修正する
 * - 一致先が正表記候補なら、誤検知を防ぐため無修正とする
 * - いずれにも一致しなければ `undefined`
 *
 * 戻り値の `matched` は入力語内の訂正対象部分、`corrected` はその正表記。
 * 完全一致・後方一致のどちらでも、呼び出し側は range を
 * `[end - matched.length, end]` で統一的に扱える。
 *
 * @param {string} word - 検査対象のカタカナ単語
 * @returns {{ matched: string; corrected: string } | undefined}
 */
function correctForm(word) {
  for (const { form, wrong } of forms) {
    if (word.endsWith(form)) {
      return wrong ? { matched: form, corrected: toggle(form) } : undefined;
    }
  }
  return undefined;
}

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @returns {import("@textlint/types").TextlintRuleReportHandler}
 */
function createVisitor(context) {
  const { Syntax, report, RuleError, fixer, locator } = context;
  return {
    [Syntax.Str](node) {
      const text = context.getSource(node);
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
          }),
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
