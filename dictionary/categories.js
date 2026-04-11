/**
 * 辞書カテゴリの定義と分類ロジック。
 *
 * 各カテゴリは英語語尾のパターンに対応し、
 * 辞書ファイル（dict-{name}.js）および原則（requireMark / requireNoMark）を決定する。
 */

/**
 * @typedef {'er-or-ar' | 'r-vowels' | 'y' | 'ry' | 'ty' | 'phy' | 'ure'} CategoryName
 */

/**
 * @typedef {{
 *   name: CategoryName,
 *   principle: 'requireMark' | 'requireNoMark',
 *   pattern: RegExp,
 * }} Category
 */

/**
 * カテゴリ定義。評価順序が重要: -ry/-ty/-phy は汎用の -y より先に評価する。
 * @type {readonly Category[]}
 */
export const CATEGORIES = [
  { name: 'ry',       principle: 'requireNoMark', pattern: /ry$/i },
  { name: 'ty',       principle: 'requireNoMark', pattern: /ty$/i },
  { name: 'phy',      principle: 'requireNoMark', pattern: /phy$/i },
  { name: 'y',        principle: 'requireMark',   pattern: /y$/i },
  { name: 'ure',      principle: 'requireNoMark', pattern: /ure$/i },
  { name: 'er-or-ar', principle: 'requireMark',   pattern: /[^aeiou](er|or|ar)$/i },
  { name: 'r-vowels', principle: 'requireNoMark', pattern: /(er|or|ar)$/i },
];

/**
 * 英語原語の語尾からカテゴリを判定する。
 * @param {string | null} english - 英語原語（例: "compiler"）。不明なら null
 * @returns {Category | null} 該当カテゴリ、分類不能なら null
 */
export function classify(english) {
  if (!english) return null;
  const lc = english.toLowerCase();
  for (const category of CATEGORIES) {
    if (category.pattern.test(lc)) return category;
  }
  return null;
}
