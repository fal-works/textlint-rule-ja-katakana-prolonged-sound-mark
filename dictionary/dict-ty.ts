import type { DictSource } from './types.ts';

/**
 * 英語原語の語尾が -ty（-bility を含む）のカタカナ語。
 *
 * 原則に従えば末尾長音符なしが正表記。
 */
const dict: DictSource = {
  requireMark: [
    "アイデンティティー", // identity (-ty) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "キャパシティー",   // capacity (-ty) 同上
  ],
  requireNoMark: [
    // -ty
    "プロパティ",       // property (-ty)
    "セキュリティ",     // security (-ty)
    "コミュニティ",     // community (-ty)
    "プライオリティ",   // priority (-ty)
    "インテグリティ",   // integrity (-ty)
    "クオリティ",       // quality (-ty)
    "オーソリティ",     // authority (-ty)
    "ベロシティ",       // velocity (-ty)
    "アクティビティ",   // activity (-ty)
    "エンティティ",     // entity (-ty)
    "ユーティリティ",   // utility (-ty)
    "ファシリティ",     // facility (-ty)
    "パリティ",         // parity (-ty)
    "オーセンティシティ", // authenticity (-ty)
    "アジリティ",       // agility (-ty)
    "ダイバーシティ",   // diversity (-ty)
    "リアリティ",       // reality (-ty)
    "プロダクティビティ", // productivity (-ty)
    "クリエイティビティ", // creativity (-ty)
    "スペシャリティ",   // specialty (-ty)
    "リアクティビティ", // reactivity (-ty)
    "サステナビリティ", // sustainability (-ty)
    "アベイラビリティ", // availability (-ty)
    "コネクティビティ", // connectivity (-ty)
    "エラスティシティ", // elasticity (-ty)
    "ケイパビリティ",   // capability (-ty)
    "アフィニティ",     // affinity (-ty)
    "グラニュラリティ", // granularity (-ty)
    "コモディティ",     // commodity (-ty)
    "インタラクティビティ", // interactivity (-ty)
    "コンフィデンシャリティ", // confidentiality (-ty)
    "ファンクショナリティ",   // functionality (-ty)

    // -bility
    "アクセシビリティ",       // accessibility (-bility)
    "スケーラビリティ",       // scalability (-bility)
    "ユーザビリティ",         // usability (-bility)
    "ポータビリティ",         // portability (-bility)
    "リライアビリティ",       // reliability (-bility)
    "コンパティビリティ",     // compatibility (-bility)
    "フレキシビリティ",       // flexibility (-bility)
    "レスポンシビリティ",     // responsibility (-bility)
    "アカウンタビリティ",     // accountability (-bility)
    "オブザーバビリティ",     // observability (-bility)
    "イミュータビリティ",     // immutability (-bility)
    "ミュータビリティ",       // mutability (-bility)
    "リーダビリティ",         // readability (-bility)
    "メンテナビリティ",       // maintainability (-bility)
    "トレーサビリティ",       // traceability (-bility)
    "インターオペラビリティ", // interoperability (-bility)
    "エクステンシビリティ",   // extensibility (-bility)
    "テスタビリティ",         // testability (-bility)
    "コンポーザビリティ",     // composability (-bility)
    "ディペンダビリティ",     // dependability (-bility)
    "サポータビリティ",       // supportability (-bility)
    "モニタラビリティ",       // monitorability (-bility)
    "デバッガビリティ",       // debuggability (-bility)
    "ヴァルネラビリティ",     // vulnerability (-bility)
    "ディスカバラビリティ",   // discoverability (-bility)
    "アダプタビリティ",       // adaptability (-bility)
    "デュラビリティ",         // durability (-bility)
    "オペラビリティ",         // operability (-bility)
    "リピータビリティ",       // repeatability (-bility)
    "プレディクタビリティ",   // predictability (-bility)
    "リユーザビリティ",       // reusability (-bility)
  ],
};
export default dict;
