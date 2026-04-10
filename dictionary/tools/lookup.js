import erOrAr from '../dict-er-or-ar.js';
import short from '../dict-short.js';
import long from '../dict-long.js';

/** @type {Map<string, { file: string, key: string }>} */
const wordMap = new Map();
for (const { file, source } of [
  { file: 'dict-er-or-ar.js', source: erOrAr },
  { file: 'dict-short.js', source: short },
  { file: 'dict-long.js', source: long },
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
