/**
 * Microsoft の原則通り、末尾長音符なしを正表記とする語。
 *
 * 登録対象:
 * - 語尾が -er/-or/-ar 以外で、日本語で4音節以上（長音符は1音節でカウント）のカタカナ語
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

    // -ure
    "アーキテクチャ",         // architecture (-ure)
    "シグネチャ",             // signature (-ure)
    "インフラストラクチャ",   // infrastructure (-ure)
    "プロシージャ",           // procedure (-ure)

    // -air
    "ペア",             // pair (-air)
  ]
};
