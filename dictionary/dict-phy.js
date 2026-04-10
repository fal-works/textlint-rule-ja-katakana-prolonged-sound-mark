/**
 * 英語原語の語尾が -phy のカタカナ語。
 *
 * 原則に従えば末尾長音符なしが正表記。
 *
 * @type {import("./builder.js").DictSource}
 */
export default {
  requireMark: [
    "フォトグラフィー", // photography (-phy) スタイルガイドに例外として明記
  ],
  requireNoMark: [
    "タイポグラフィ",         // typography (-phy)
    "クリプトグラフィ",       // cryptography (-phy)
    "デモグラフィ",           // demography (-phy)
    "トポグラフィ",           // topography (-phy)
    "ステガノグラフィ",       // steganography (-phy)
    "バイオグラフィ",         // biography (-phy)
    "フィロソフィ",           // philosophy (-phy)
    "ビブリオグラフィ",       // bibliography (-phy)
  ],
};
