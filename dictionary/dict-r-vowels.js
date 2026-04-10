/**
 * 英語原語の語尾が母音 + -er/-or/-ar のカタカナ語。
 *
 * 原則に従えば末尾長音符なしが正表記。
 *
 * @type {import("./builder.js").DictSource}
 */
export default {
  requireNoMark: [
    // -eer
    "エンジニア",      // engineer (-eer)

    // -ear
    "リニア",           // linear (-ear)
    "クリア",           // clear (-ear)
    "ギア",             // gear (-ear)

    // -ier
    "バリア",           // barrier (-ier)
    "キャリア",         // carrier (-ier)

    // -oor
    "ドア",             // door (-oor)
    "フロア",           // floor (-oor)
  ],
};
