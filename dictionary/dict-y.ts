import type { DictSource } from "./types.ts";

/**
 * 英語原語の語尾が -y（-ry, -ty, -phy を除く）のカタカナ語。
 *
 * 原則に従えば末尾長音符ありが正表記。
 */
const dict: DictSource = {
  requireMark: [
    // -cy
    "コンピテンシー", // competency/ スタイルガイドに例外として明記
    "ポリシー", // policy / 同上
    { word: "コンシステンシー", variants: ["インコンシステンシー"] }, // consistency/ Microsoft のドキュメントでも末尾長音符あり
    "レガシー", // legacy/ Microsoft のドキュメントでも揺れているので自然なほうを選択
    "プライバシー", // privacy / 同上
    "レイテンシー", // latency / 同上
    "リテラシー", // literacy/ Microsoft のドキュメントでも末尾長音符あり
    "ディペンデンシー", // dependency
    "トランスペアレンシー", // transparency
    "フリクエンシー", // frequency
    "エマージェンシー", // emergency
    "エージェンシー", // agency
    "アキュラシー", // accuracy
    "レジリエンシー", // resiliency
    "フルエンシー", // fluency
    "プロフィシェンシー", // proficiency
    "サフィシェンシー", // sufficiency
    "エフィシェンシー", // efficiency
    "リダンダンシー", // redundancy
    { word: "カレンシー", falsePositives: ["コンカレンシー"] }, // currency / 偽同定防止: concurrency
    "コンカレンシー", // concurrency

    // -gy
    "テクノロジー", // technology/ Microsoft のドキュメントでも揺れているので自然なほうを選択
    "ストラテジー", // strategy / 同上
    "トポロジー", // topology / 同上
    "メソドロジー", // methodology / 同上
    "オントロジー", // ontology / 同上
    "アナロジー", // analogy/ Microsoft のドキュメントでも末尾長音符あり
    "エコロジー", // ecology / 同上
    "エナジー", // energy / 同上
    "シナジー", // synergy / 同上
    "ニューロロジー", // neurology
    "バイオロジー", // biology
    "クロノロジー", // chronology

    // -my
    "タクソノミー", // taxonomy/ Microsoft のドキュメントでも末尾長音符あり
    "エコノミー", // economy / 同上
    "オートノミー", // autonomy

    // -py
    "エントロピー", // entropy/ Microsoft のドキュメントでも揺れているので自然なほうを選択

    // -ny
    "カンパニー", // company/ スタイルガイドに例外として明記

    // -ly
    "ファミリー", // family / Microsoft のドキュメントでも揺れているので自然なほうを選択
    "アノマリー", // anomaly / 同上
  ],
  requireNoMark: [
    "プロキシ", // proxy / 技術用語として長音符なしで定着
    "アセンブリ", // assembly / 技術用語として長音符なしで定着
  ],
};
export default dict;
