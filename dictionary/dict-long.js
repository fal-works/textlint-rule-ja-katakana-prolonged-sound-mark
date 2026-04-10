/**
 * 英語原語の語尾が -er/-or/-ar 以外で、
 * 末尾長音符あり表記の実効文字数が 4 以上のカタカナ語。
 *
 * 原則（Microsoft スタイルガイド）に従えば末尾長音符なしが正表記。
 *
 * @type {import("./builder.js").DictSource}
 */
export default {
  requireMark: [
    // -cy
    "コンピテンシー",   // competency (-cy) スタイルガイドに例外として明記
    "ポリシー",         // policy (-cy) 同上
    "コンカレンシー",     // concurrency (-cy) Microsoft のドキュメントでも末尾長音符あり
    "コンシステンシー",   // consistency (-cy) 同上
    "レガシー",          // legacy (-cy) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "プライバシー",      // privacy (-cy) 同上
    "レイテンシー",      // latency (-cy) 同上
    "リテラシー",        // literacy (-cy) Microsoft のドキュメントでも末尾長音符あり
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
    "テクノロジー",     // technology (-gy) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "ストラテジー",     // strategy (-gy) 同上
    "トポロジー",       // topology (-gy) 同上
    "メソドロジー",     // methodology (-gy) 同上
    "オントロジー",     // ontology (-gy) 同上
    "アナロジー",       // analogy (-gy) Microsoft のドキュメントでも末尾長音符あり
    "エコロジー",       // ecology (-gy) 同上
    "エナジー",         // energy (-gy) 同上
    "シナジー",         // synergy (-gy) 同上
    "ニューロロジー",            // neurology (-gy)
    "バイオロジー",              // biology (-gy)
    "クロノロジー",              // chronology (-gy)

    // -ry
    "サマリー",         // summary (-ry) スタイルガイドに例外として明記
    "バッテリー",       // battery (-ry) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "デリバリー",       // delivery (-ry) 同上
    "リカバリー",       // recovery (-ry) 同上
    "ギャラリー",       // gallery (-ry) Microsoft のドキュメントでも末尾長音符あり
    "ディスカバリー",   // discovery (-ry) 同上
    "ドキュメンタリー", // documentary (-ary) 同上

    // -ty
    "アイデンティティー", // identity (-ty) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "キャパシティー",   // capacity (-ty) 同上

    // -my
    "タクソノミー",     // taxonomy (-my) Microsoft のドキュメントでも末尾長音符あり
    "エコノミー",       // economy (-my) 同上
    "オートノミー",              // autonomy (-my)

    // -py
    "エントロピー",     // entropy (-py) Microsoft のドキュメントでも揺れているので自然なほうを選択

    // -ure
    "エクスポージャー",  // exposure (-ure) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "フィーチャー",      // feature (-ure) Microsoft のドキュメントでも揺れているので自然なほうを選択

    // other
    "フォトグラフィー", // photography (-phy) スタイルガイドに例外として明記
    "カンパニー",       // company (-ny) 同上
    "ファミリー",       // family (-ly) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "アノマリー",       // anomaly (-ly) 同上
  ],
  requireNoMark: [
    // -ory
    "メモリ",           // memory (-ory)
    "ディレクトリ",     // directory (-ory)
    "リポジトリ",       // repository (-ory)
    "カテゴリ",         // category (-ory)
    "アクセサリ",       // accessory (-ory)
    "ヒストリ",         // history (-ory)
    "インベントリ",     // inventory (-ory)
    "ファクトリ",       // factory (-ory)

    // -ary
    "ライブラリ",       // library (-ary)
    "バイナリ",         // binary (-ary)
    "プライマリ",       // primary (-ary)
    "セカンダリ",       // secondary (-ary)
    "バウンダリ",       // boundary (-ary)
    "テンポラリ",       // temporary (-ary)
    "プロプライエタリ", // proprietary (-ary)
    "アドバーサリ",     // adversary (-ary)

    // -try
    "レジストリ",       // registry (-ry)
    "エントリ",         // entry (-ry)
    "インダストリ",     // industry (-ry)
    "クエリ",           // query (-ry)
    "テレメトリ",       // telemetry (-ry)
    // "ジオメトリ",    // geometry (-ry) Microsoft のドキュメントでは末尾長音符なしだけがヒット
    // "ディクショナリ", // dictionary (-ry) Microsoft のドキュメントでは末尾長音符なしだけがヒット
    "アセンブリ",       // assembly (-bly)

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
    "コンフィデンシャリティ", // confidentiality (-bility)
    "ファンクショナリティ",   // functionality (-bility)
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

    // -ure
    "アーキテクチャ",         // architecture (-ure)
    "シグネチャ",             // signature (-ure)
    "インフラストラクチャ",   // infrastructure (-ure)
    "プロシージャ",           // procedure (-ure)
    "クロージャ",             // closure (-ure)
    "ストラクチャ",           // structure (-ure)
    "フィクスチャ",           // fixture (-ure)
    "ピクチャ",               // picture (-ure)
    "フューチャ",             // future (-ure)
    "ミクスチャ",             // mixture (-ure)
    "マニュファクチャ",       // manufacture (-ure)
    "ジェスチャ",             // gesture (-ure)
    "ベンチャ",               // venture (-ure)
    "レクチャ",               // lecture (-ure)
    "ディスクロージャ",       // disclosure (-ure)

    // -phy
    "タイポグラフィ",         // typography (-phy)
    "クリプトグラフィ",       // cryptography (-phy)
    "デモグラフィ",           // demography (-phy)
    "トポグラフィ",           // topography (-phy)
    "ステガノグラフィ",       // steganography (-phy)
    "コレオグラフィ",         // choreography (-phy)
    "カートグラフィ",         // cartography (-phy)
    "バイオグラフィ",         // biography (-phy)
    "フィロソフィ",           // philosophy (-phy)
    "ビブリオグラフィ",       // bibliography (-phy)

    // other
    "プロキシ",               // proxy (-xy)
  ],
  allowBoth: [
    "テクスチャ",       // texture (-ure) HHかもしれん
  ],
};
