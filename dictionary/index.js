/**
 * 辞書ビルドスクリプト。
 *
 * dictionary/ 内の各ソースファイルから正表記を読み込み、
 * バリデーションを行ったうえで誤表記の Set を lib/dictionary.js に出力する。
 *
 * 使い方: node dictionary/index.js
 */

import { writeFileSync } from "node:fs";

import dictRegularWithMark from "./dict-regular-with-mark.js";
import dictRegularWithoutMark from "./dict-regular-without-mark.js";
import dictConventional from "./dict-conventional.js";
import dictAllowedBoth from "./dict-allowed-both.js";
import { validate, generateWrongForms, renderModule } from "./builder.js";

const sources = new Map([
  ["dict-regular-with-mark", dictRegularWithMark],
  ["dict-regular-without-mark", dictRegularWithoutMark],
  ["dict-conventional", dictConventional],
  ["dict-allowed-both", dictAllowedBoth],
]);

const errors = validate(sources);
if (errors.length > 0) {
  console.error("辞書ビルドエラー:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

const wrongForms = generateWrongForms(sources);
writeFileSync("lib/dictionary.js", renderModule(wrongForms));
console.log(`lib/dictionary.js を生成しました (${wrongForms.length} 件)`);
