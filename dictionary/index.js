/**
 * 辞書ビルドスクリプト。
 *
 * dictionary/ 内の各ソースファイルから正表記を読み込み、
 * バリデーションを行ったうえで誤表記の Set を lib/dictionary.js に出力する。
 *
 * 使い方: node dictionary/index.js
 */

import { writeFileSync } from "node:fs";

import dictErOrAr from "./dict-er-or-ar.js";
import dictRVowels from "./dict-r-vowels.js";
import dictY from "./dict-y.js";
import dictRy from "./dict-ry.js";
import dictTyPhy from "./dict-ty-phy.js";
import dictUre from "./dict-ure.js";
import { validate, generateWrongForms, renderModule } from "./builder.js";

const sources = new Map([
  ["dict-er-or-ar", dictErOrAr],
  ["dict-r-vowels", dictRVowels],
  ["dict-y", dictY],
  ["dict-ry", dictRy],
  ["dict-ty-phy", dictTyPhy],
  ["dict-ure", dictUre],
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
