import type { DictSource } from "./types.ts";

/**
 * 英語原語の語尾が母音 + -er/-or/-ar のカタカナ語。
 *
 * 原則に従えば末尾長音符なしが正表記。
 */
const dict: DictSource = {
  requireNoMark: [
    // -eer
    "エンジニア", // engineer

    // -ear
    "リニア", // linear
    { word: "クリア", falsePositives: ["ニュークリア"] }, // clear / 偽同定防止: nuclear
    "ギア", // gear

    // -ier
    "バリア", // barrier
    "キャリア", // carrier

    // -oor
    "ドア", // door
    "フロア", // floor
  ],
  allowBoth: [
    "ニュークリア", // nuclear
  ],
};
export default dict;
