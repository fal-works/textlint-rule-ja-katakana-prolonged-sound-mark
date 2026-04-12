/**
 * 辞書ビルドスクリプト。
 *
 * `dictionary/` 内の各ソースファイルから正表記を読み込み、
 * バリデーションを行ったうえで、検査時に参照する表記配列を `lib/dictionary.js` に出力する。
 *
 * 使い方: `node dictionary/index.ts`
 */

import { writeFileSync } from "node:fs";

import { validate, generateForms, renderModule } from "./builder.ts";
import { CATEGORIES } from "./categories.ts";
import { sourceByCategory } from "./sources.ts";
import type { DictSource } from "./types.ts";

const sources = new Map<string, DictSource>();
for (const { name } of CATEGORIES) {
  const source = sourceByCategory.get(name);
  if (!source) throw new Error(`Category "${name}" has no source`);
  sources.set(`dict-${name}`, source);
}

const errors = validate(sources);
if (errors.length > 0) {
  console.error("辞書ビルドエラー:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

const forms = generateForms(sources);
writeFileSync("lib/dictionary.js", renderModule(forms));
console.log(
  `lib/dictionary.js を生成しました (wrongForms: ${forms.wrongForms.length} 件, correctForms: ${forms.correctForms.length} 件)`,
);
