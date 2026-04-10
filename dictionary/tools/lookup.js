import erOrAr from '../dict-er-or-ar.js';
import rVowels from '../dict-r-vowels.js';
import y from '../dict-y.js';
import ry from '../dict-ry.js';
import ty from '../dict-ty.js';
import phy from '../dict-phy.js';
import ure from '../dict-ure.js';

/** @type {Map<string, { file: string, key: string }>} */
const wordMap = new Map();
for (const { file, source } of [
  { file: 'dict-er-or-ar.js', source: erOrAr },
  { file: 'dict-r-vowels.js', source: rVowels },
  { file: 'dict-y.js', source: y },
  { file: 'dict-ry.js', source: ry },
  { file: 'dict-ty.js', source: ty },
  { file: 'dict-phy.js', source: phy },
  { file: 'dict-ure.js', source: ure },
]) {
  for (const key of /** @type {const} */ (['requireMark', 'requireNoMark', 'allowBoth'])) {
    const words = source[key];
    if (!words) continue;
    for (const word of words) {
      wordMap.set(word, { file, key });
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
 * @returns {{ file: string, key: string } | null} 登録先情報、未登録なら null
 */
export function lookup(word) {
  return wordMap.get(word) ?? wordMap.get(toggle(word)) ?? null;
}
