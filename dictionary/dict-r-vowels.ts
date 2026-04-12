import type { DictSource } from "./types.ts";

/**
 * 英語原語の語尾が母音 + -er/-or/-ar のカタカナ語。
 *
 * 原則に従えば末尾長音符なしが正表記。
 */
const dict: DictSource = {
  requireNoMark: [
    // -eer
    "エンジニア", // engineer (-eer)

    // -ear
    "リニア", // linear (-ear)
    { word: "クリア", falsePositives: ["ニュークリア"] }, // clear (-ear) / 偽同定防止: nuclear
    "ギア", // gear (-ear)

    // -ier
    "バリア", // barrier (-ier)
    "キャリア", // carrier (-ier)

    // -oor
    "ドア", // door (-oor)
    "フロア", // floor (-oor)
  ],
  allowBoth: [
    "ニュークリア", // nuclear (-ear)
  ],
};
export default dict;
