import { CATEGORIES, type CategoryName } from "./categories.ts";
import dictErOrAr from "./dict-er-or-ar.ts";
import dictPhy from "./dict-phy.ts";
import dictRVowels from "./dict-r-vowels.ts";
import dictRy from "./dict-ry.ts";
import dictTy from "./dict-ty.ts";
import dictUre from "./dict-ure.ts";
import dictY from "./dict-y.ts";
import type { DictSource } from "./types.ts";

/**
 * カテゴリ名から辞書ソースモジュールへの対応表を一元管理する。
 */
export const sourceByCategory: ReadonlyMap<CategoryName, DictSource> = new Map([
  ["er-or-ar", dictErOrAr],
  ["r-vowels", dictRVowels],
  ["y", dictY],
  ["ry", dictRy],
  ["ty", dictTy],
  ["phy", dictPhy],
  ["ure", dictUre],
]);

// CATEGORIES に定義されたカテゴリがすべて sourceByCategory に存在するか検証
for (const { name } of CATEGORIES) {
  if (!sourceByCategory.has(name)) {
    throw new Error(`Category "${name}" has no corresponding dict source in sources.ts`);
  }
}
