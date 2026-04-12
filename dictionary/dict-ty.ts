import type { DictSource } from "./types.ts";

/**
 * 英語原語の語尾が -ty（-bility を含む）のカタカナ語。
 *
 * 原則に従えば末尾長音符なしが正表記。
 */
const dict: DictSource = {
  requireMark: [
    "アイデンティティー", // identity / Microsoft のドキュメントでも揺れているので自然なほうを選択
    "キャパシティー", // capacity / 同上
  ],
  requireNoMark: [
    // -ty
    "プロパティ", // property
    "セキュリティ", // security
    "コミュニティ", // community
    "プライオリティ", // priority
    "インテグリティ", // integrity
    "クオリティ", // quality
    "オーソリティ", // authority
    "ベロシティ", // velocity
    { word: "アクティビティ", variants: ["リアクティビティ"] }, // activity
    "エンティティ", // entity
    "ユーティリティ", // utility
    "ファシリティ", // facility
    "パリティ", // parity
    "オーセンティシティ", // authenticity
    "アジリティ", // agility
    "ダイバーシティ", // diversity
    "リアリティ", // reality
    "プロダクティビティ", // productivity
    "クリエイティビティ", // creativity
    "スペシャリティ", // specialty
    "サステナビリティ", // sustainability
    "アベイラビリティ", // availability
    "コネクティビティ", // connectivity
    "エラスティシティ", // elasticity
    "ケイパビリティ", // capability
    "アフィニティ", // affinity
    "グラニュラリティ", // granularity
    "コモディティ", // commodity
    "インタラクティビティ", // interactivity
    "コンフィデンシャリティ", // confidentiality
    "ファンクショナリティ", // functionality

    // -bility
    "アクセシビリティ", // accessibility
    "スケーラビリティ", // scalability
    { word: "ユーザビリティ", variants: ["リユーザビリティ"] }, // usability
    { word: "ポータビリティ", falsePositives: ["サポータビリティ"] }, // portability / 偽同定防止: supportability
    "サポータビリティ", // supportability
    "リライアビリティ", // reliability
    "コンパティビリティ", // compatibility
    "フレキシビリティ", // flexibility
    "レスポンシビリティ", // responsibility
    "アカウンタビリティ", // accountability
    "オブザーバビリティ", // observability
    { word: "ミュータビリティ", variants: ["イミュータビリティ"] }, // mutability
    "リーダビリティ", // readability
    "メンテナビリティ", // maintainability
    "トレーサビリティ", // traceability
    "エクステンシビリティ", // extensibility
    "テスタビリティ", // testability
    "コンポーザビリティ", // composability
    "ディペンダビリティ", // dependability
    "モニタラビリティ", // monitorability
    "デバッガビリティ", // debuggability
    "ヴァルネラビリティ", // vulnerability
    "ディスカバラビリティ", // discoverability
    "アダプタビリティ", // adaptability
    "デュラビリティ", // durability
    { word: "オペラビリティ", variants: ["インターオペラビリティ"] }, // operability
    "リピータビリティ", // repeatability
    "プレディクタビリティ", // predictability
  ],
};
export default dict;
