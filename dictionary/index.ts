/**
 * 辞書ビルドスクリプト。
 *
 * dictionary/ 内の各ソースファイルから正表記を読み込み、
 * バリデーションを行ったうえで runtime 用の form 配列を lib/dictionary.js に出力する。
 *
 * 使い方: node dictionary/index.ts
 */

import { writeFileSync } from "node:fs";

import type { DictSource } from "./types.ts";
import { CATEGORIES } from "./categories.ts";
import { sourceByCategory } from "./sources.ts";
import { validate, generateForms, renderModule } from "./builder.ts";

const sources = new Map<string, DictSource>(
  CATEGORIES.map(({ name }) => [
    `dict-${name}`,
    sourceByCategory.get(name)!,
  ]),
);

const errors = validate(sources);
if (errors.length > 0) {
  console.error("辞書ビルドエラー:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

const forms = generateForms(sources);
writeFileSync("lib/dictionary.js", renderModule(forms));
console.log(
  `lib/dictionary.js を生成しました (wrongForms: ${forms.wrongForms.length} 件, correctForms: ${forms.correctForms.length} 件)`
);
