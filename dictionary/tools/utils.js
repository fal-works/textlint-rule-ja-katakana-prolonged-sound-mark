/** 小書き文字（実効文字数のカウント対象外） */
const SMALL_KATAKANA = new Set([...'ァィゥェォッャュョ']);

/**
 * 末尾長音符を正規化して「あり」表記にする。
 * @param {string} katakana - 末尾長音符の有無は問わない
 * @returns {string} 末尾長音符あり表記
 */
export function normalizeWithMark(katakana) {
  return katakana.at(-1) === 'ー' ? katakana : katakana + 'ー';
}

/**
 * 末尾長音符あり表記の実効文字数を返す。
 * 小書き文字（ァィゥェォッャュョ）は数えない。ー は 1 文字として数える。
 * @param {string} katakana - 末尾長音符の有無は問わない。ただしカタカナ以外が一切含まれないようにすること
 * @returns {number}
 */
export function countEffectiveChars(katakana) {
  const word = normalizeWithMark(katakana);
  let count = 0;
  for (const ch of word) {
    if (!SMALL_KATAKANA.has(ch)) count++;
  }
  return count;
}

/**
 * @typedef {'er-or-ar' | 'short' | 'long'} MsPrincipleRationale
 * - er-or-ar: 英語原語の語尾が -er/-or/-ar
 * - short:    上記以外で、末尾長音符あり表記の実効文字数が 4 未満
 * - long:     上記以外
 */

/**
 * @typedef {{ withMark: boolean, rationale: MsPrincipleRationale }} MsPrincipleResult
 */

/**
 * Microsoft の原則に基づき、カタカナ語末尾の長音符の有無を判定する。
 * @param {string} katakana - カタカナ語（末尾長音符の有無は問わない。ただしカタカナ以外が一切含まれないようにすること）
 * @param {string|null} english  - 英語原語（例: "compiler"）。英語でない場合は null
 * @returns {MsPrincipleResult}
 */
export function applyMsPrinciple(katakana, english) {
  if (english && /(er|or|ar)$/i.test(english)) {
    return { withMark: true, rationale: 'er-or-ar' };
  }
  if (countEffectiveChars(katakana) < 4) {
    return { withMark: true, rationale: 'short' };
  }
  return { withMark: false, rationale: 'long' };
}
