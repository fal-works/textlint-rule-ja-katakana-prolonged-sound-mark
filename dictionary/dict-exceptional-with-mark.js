/**
 * 本プロジェクト独自ルールで末尾長音符ありを正表記とする語。
 *
 * 採録条件:
 * - 語尾が -cy/-gy/-my/-ny のカタカナ語
 *
 * 登録対象の語:
 * - 末尾長音符ありで表記された語
 *
 * @type {import("./builder.js").DictSource}
 */
export default {
  requireMark: [
    // -cy
    "ディペンデンシー",          // dependency (-cy)
    "トランスペアレンシー",      // transparency (-cy)
    "フリクエンシー",            // frequency (-cy)
    "エマージェンシー",          // emergency (-cy)
    "エージェンシー",            // agency (-cy)
    "アキュラシー",              // accuracy (-cy)
    "レジリエンシー",            // resiliency (-cy)
    "インコンシステンシー",      // inconsistency (-cy)
    "フルエンシー",              // fluency (-cy)
    "プロフィシェンシー",        // proficiency (-cy)
    "サフィシェンシー",          // sufficiency (-cy)
    "エフィシェンシー",          // efficiency (-cy)
    "リダンダンシー",            // redundancy (-cy)
    "カレンシー",                // currency (-cy)
    "デモクラシー",              // democracy (-cy)

    // -gy
    "ニューロロジー",            // neurology (-gy)
    "バイオロジー",              // biology (-gy)
    "クロノロジー",              // chronology (-gy)

    // -my
    "オートノミー",              // autonomy (-my)
  ]
};
