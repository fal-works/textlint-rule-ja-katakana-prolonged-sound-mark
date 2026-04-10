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
 *
 * 本プロジェクトの原則では使用しないが、Microsoft スタイルガイドの
 * 原則（実効文字数 4 未満 → 長音符あり）を確認する際に有用。
 *
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
 * @typedef {'er-or-ar' | 'r-vowels' | 'y' | 'ry' | 'ty-phy' | 'ure' | null} PrincipleRationale
 * - er-or-ar: 英語原語の語尾が 子音 + -er/-or/-ar
 * - r-vowels: 英語原語の語尾が 母音 + -er/-or/-ar
 * - y:        英語原語の語尾が -y（-ry, -ty, -phy を除く）
 * - ry:       英語原語の語尾が -ry（-ory, -ary を含む）
 * - ty-phy:   英語原語の語尾が -ty（-bility を含む）または -phy
 * - ure:      英語原語の語尾が -ure
 * - null:     分類不能
 */

/**
 * @typedef {{ withMark: boolean | null, rationale: PrincipleRationale }} PrincipleResult
 */

/**
 * 原則に基づき、カタカナ語末尾の長音符の有無を判定する。
 * @param {string} _katakana - カタカナ語（現在は未使用だが、将来の拡張のため受け取る）
 * @param {string|null} english  - 英語原語（例: "compiler"）。英語でない場合は null
 * @returns {PrincipleResult}
 */
export function applyPrinciple(_katakana, english) {
  if (!english) return { withMark: null, rationale: null };
  const lc = english.toLowerCase();

  // -ry（-ory, -ary を含む）→ なし（-y より先に評価）
  if (/ry$/i.test(lc)) return { withMark: false, rationale: 'ry' };

  // -ty（-bility を含む）/ -phy → なし（-y より先に評価）
  if (/(?:ty|phy)$/i.test(lc)) return { withMark: false, rationale: 'ty-phy' };

  // その他の -y → あり
  if (/y$/i.test(lc)) return { withMark: true, rationale: 'y' };

  // -ure → なし
  if (/ure$/i.test(lc)) return { withMark: false, rationale: 'ure' };

  // 子音 + -er/-or/-ar → あり
  if (/[^aeiou](er|or|ar)$/i.test(lc)) return { withMark: true, rationale: 'er-or-ar' };

  // 母音 + -er/-or/-ar → なし
  if (/(er|or|ar)$/i.test(lc)) return { withMark: false, rationale: 'r-vowels' };

  // 分類不能
  return { withMark: null, rationale: null };
}
