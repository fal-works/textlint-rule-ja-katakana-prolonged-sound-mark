/** 小書き文字（実効文字数のカウント対象外） */
const SMALL_KATAKANA = new Set([...'ァィゥェォッャュョ']);

/**
 * 末尾長音符を正規化して「あり」表記にする。
 */
export function normalizeWithMark(katakana: string): string {
  return katakana.at(-1) === 'ー' ? katakana : katakana + 'ー';
}

/**
 * 末尾長音符あり表記の実効文字数を返す。
 * 小書き文字（ァィゥェォッャュョ）は数えない。ー は 1 文字として数える。
 *
 * 本プロジェクトの原則では使用しないが、Microsoft スタイルガイドの
 * 原則（実効文字数 4 未満 → 長音符あり）を確認する際に有用。
 */
export function countEffectiveChars(katakana: string): number {
  const word = normalizeWithMark(katakana);
  let count = 0;
  for (const ch of word) {
    if (!SMALL_KATAKANA.has(ch)) count++;
  }
  return count;
}
