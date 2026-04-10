/**
 * Microsoft の原則通り、末尾長音符なしを正表記とする語。
 *
 * 登録対象:
 * - 語尾が -er/-or/-ar 以外で、末尾長音符を付けた形での文字数が4以上（小書き文字を除く）のカタカナ語
 * - かつ、慣例優先・両方許容・カスタム例外のいずれにも該当しない語
 *
 * 登録対象の語:
 * - 末尾長音符なしで表記された語
 *
 * 用途:
 * - ここに登録されたほうの表記を正表記として扱う
 *
 * @type {import("./builder.js").DictSource}
 */
export default {
  type: "require-no-mark", words: [
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
  ]
};
