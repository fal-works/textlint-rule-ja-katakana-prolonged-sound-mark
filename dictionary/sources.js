/**
 * カテゴリ名から辞書ソースモジュールへの対応表を一元管理する。
 */

import { CATEGORIES } from './categories.js';
import dictErOrAr from './dict-er-or-ar.js';
import dictRVowels from './dict-r-vowels.js';
import dictY from './dict-y.js';
import dictRy from './dict-ry.js';
import dictTy from './dict-ty.js';
import dictPhy from './dict-phy.js';
import dictUre from './dict-ure.js';

/** @type {ReadonlyMap<import("./categories.js").CategoryName, import("./builder.js").DictSource>} */
export const sourceByCategory = new Map([
  ['er-or-ar', dictErOrAr],
  ['r-vowels', dictRVowels],
  ['y', dictY],
  ['ry', dictRy],
  ['ty', dictTy],
  ['phy', dictPhy],
  ['ure', dictUre],
]);

// CATEGORIES に定義されたカテゴリがすべて sourceByCategory に存在するか検証
for (const { name } of CATEGORIES) {
  if (!sourceByCategory.has(name)) {
    throw new Error(`Category "${name}" has no corresponding dict source in sources.js`);
  }
}
