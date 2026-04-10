import regularWithMark from '../dict-regular-with-mark.js';
import regularWithoutMark from '../dict-regular-without-mark.js';
import conventionalWithMark from '../dict-conventional-with-mark.js';
import conventionalWithoutMark from '../dict-conventional-without-mark.js';
import exceptionalWithMark from '../dict-exceptional-with-mark.js';
import allowedBoth from '../dict-allowed-both.js';

/** @type {Map<string, string>} */
const wordMap = new Map();
for (const { file, source } of [
  { file: 'dict-regular-with-mark.js', source: regularWithMark },
  { file: 'dict-regular-without-mark.js', source: regularWithoutMark },
  { file: 'dict-conventional-with-mark.js', source: conventionalWithMark },
  { file: 'dict-conventional-without-mark.js', source: conventionalWithoutMark },
  { file: 'dict-exceptional-with-mark.js', source: exceptionalWithMark },
  { file: 'dict-allowed-both.js', source: allowedBoth },
]) {
  for (const word of source.words) {
    wordMap.set(word, file);
  }
}

/** @param {string} word */
function toggle(word) {
  return word.endsWith('ー') ? word.slice(0, -1) : word + 'ー';
}

/**
 * 辞書から語を検索する。末尾長音符の有無を正規化して検索する。
 * @param {string} word - 検索する語
 * @returns {string | null} 登録先の辞書ファイル名、未登録なら null
 */
export function lookup(word) {
  return wordMap.get(word) ?? wordMap.get(toggle(word)) ?? null;
}
