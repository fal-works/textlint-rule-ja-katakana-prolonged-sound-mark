import type { DictSource } from "./types.ts";

/**
 * 英語原語の語尾が -phy のカタカナ語。
 *
 * 原則に従えば末尾長音符なしが正表記。
 */
const dict: DictSource = {
  requireMark: [
    "フォトグラフィー", // photography / スタイルガイドに例外として明記
  ],
  requireNoMark: [
    "タイポグラフィ", // typography
    "クリプトグラフィ", // cryptography
    "デモグラフィ", // demography
    "トポグラフィ", // topography
    "ステガノグラフィ", // steganography
    "バイオグラフィ", // biography
    "フィロソフィ", // philosophy
    "ビブリオグラフィ", // bibliography
  ],
};
export default dict;
