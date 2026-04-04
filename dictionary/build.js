/**
 * 辞書ビルドスクリプト。
 *
 * dictionary/ 内の各ソースファイルから正表記を読み込み、
 * バリデーションを行ったうえで誤表記の Set を lib/dictionary.js に出力する。
 *
 * 使い方: node dictionary/build.js
 */

import { writeFileSync } from "node:fs";

import dictRegularWithMark from "./dict-regular-with-mark.js";
import dictRegularWithoutMark from "./dict-regular-without-mark.js";
import dictConventional from "./dict-conventional.js";
import dictAllowedBoth from "./dict-allowed-both.js";

// -------------------------------------------------------------------------
// バリデーション
// -------------------------------------------------------------------------

/** @type {string[]} */
const errors = [];

// 規則通り・末尾ーあり: 全要素が ー で終わること
for (const word of dictRegularWithMark) {
  if (!word.endsWith("ー")) {
    errors.push(`regular-with-mark: 「${word}」が「ー」で終わっていません`);
  }
}

// 規則通り・末尾ーなし: 全要素が ー で終わらないこと
for (const word of dictRegularWithoutMark) {
  if (word.endsWith("ー")) {
    errors.push(`regular-without-mark: 「${word}」が「ー」で終わっています`);
  }
}

// 全カテゴリ横断の重複検知（正表記ベース）
/** @type {Map<string, string>} word → category */
const seen = new Map();

/**
 * @param {string[]} words
 * @param {string} category
 */
function checkDuplicates(words, category) {
  for (const word of words) {
    const prev = seen.get(word);
    if (prev) {
      const where = prev === category ? `${category} 内で` : `${prev} と ${category} の間で`;
      errors.push(`重複: 「${word}」が ${where} 重複しています`);
    } else {
      seen.set(word, category);
    }
  }
}

checkDuplicates(dictRegularWithMark, "regular-with-mark");
checkDuplicates(dictRegularWithoutMark, "regular-without-mark");
checkDuplicates(dictConventional, "conventional");
checkDuplicates(dictAllowedBoth, "allowed-both");

if (errors.length > 0) {
  console.error("辞書ビルドエラー:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

// -------------------------------------------------------------------------
// 誤表記生成
// -------------------------------------------------------------------------

/** @param {string} word */
function toWrongForm(word) {
  return word.endsWith("ー") ? word.slice(0, -1) : word + "ー";
}

/** @type {string[]} */
const wrongForms = [
  ...dictRegularWithMark,
  ...dictRegularWithoutMark,
  ...dictConventional,
  // dictAllowedBoth: 登録対象外
].map(toWrongForm);

// -------------------------------------------------------------------------
// 出力
// -------------------------------------------------------------------------

const entries = wrongForms.map((w) => `  "${w}",`).join("\n");

const output = `\
// このファイルは dictionary/build.js により自動生成されています。
// 手動で編集しないでください。
export const wrongForms = new Set([
${entries}
]);
`;

writeFileSync("lib/dictionary.js", output);
console.log(`lib/dictionary.js を生成しました (${wrongForms.length} 件)`);
