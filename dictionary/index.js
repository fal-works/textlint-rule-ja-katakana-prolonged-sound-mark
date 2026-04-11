/**
 * 辞書ビルドスクリプト。
 *
 * dictionary/ 内の各ソースファイルから正表記を読み込み、
 * バリデーションを行ったうえで誤表記の Set を lib/dictionary.js に出力する。
 *
 * 使い方: node dictionary/index.js
 */

import { writeFileSync } from "node:fs";

import { CATEGORIES } from "./categories.js";
import { sourceByCategory } from "./sources.js";
import { validate, generateWrongForms, renderModule } from "./builder.js";

const sources = new Map(
  CATEGORIES.map(({ name }) => [
    `dict-${name}`,
    /** @type {import("./builder.js").DictSource} */ (sourceByCategory.get(name)),
  ]),
);

const errors = validate(sources);
if (errors.length > 0) {
  console.error("辞書ビルドエラー:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

const wrongForms = generateWrongForms(sources);
writeFileSync("lib/dictionary.js", renderModule(wrongForms));
console.log(`lib/dictionary.js を生成しました (${wrongForms.length} 件)`);
