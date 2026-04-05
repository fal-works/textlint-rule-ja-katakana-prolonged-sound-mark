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
  rule: "require-no-mark", words: [
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

    // -ure
    "アーキテクチャ",         // architecture (-ure)
    "シグネチャ",             // signature (-ure)
    "インフラストラクチャ",   // infrastructure (-ure)
    "プロシージャ",           // procedure (-ure)
  ]
};
