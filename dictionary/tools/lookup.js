import { CATEGORIES } from '../categories.js';
import { sourceByCategory } from '../sources.js';

/** @type {Map<string, { category: import("../categories.js").CategoryName, key: string }>} */
const wordMap = new Map();
for (const { name } of CATEGORIES) {
  const source = sourceByCategory.get(name);
  if (!source) continue;
  for (const key of /** @type {const} */ (['requireMark', 'requireNoMark', 'allowBoth'])) {
    const words = source[key];
    if (!words) continue;
    for (const word of words) {
      wordMap.set(word, { category: name, key });
    }
  }
}

/** @param {string} word */
function toggle(word) {
  return word.endsWith('ー') ? word.slice(0, -1) : word + 'ー';
}

/**
 * 辞書から語を検索する。末尾長音符の有無を正規化して検索する。
 * @param {string} word - 検索する語
 * @returns {{ category: import("../categories.js").CategoryName, key: string } | null} 登録先情報、未登録なら null
 */
export function lookup(word) {
  return wordMap.get(word) ?? wordMap.get(toggle(word)) ?? null;
}
