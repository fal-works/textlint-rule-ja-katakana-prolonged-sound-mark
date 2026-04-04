/**
 * 規則通りで、正表記が末尾長音符なしの語。
 *
 * -er/-or/-ar 以外の語尾で4音節以上のカタカナ語で、末尾に長音符 `ー` を付けないのが正しい表記。
 * 各エントリのコメント形式: 英語原語 (語尾パターン)
 *
 * @type {import("./builder.js").DictSource}
 */
export default { rule: "require-no-mark", words: [
  // -ory
  "メモリ",           // memory (-ory)
  "ディレクトリ",     // directory (-ory)
  "リポジトリ",       // repository (-ory)
  "カテゴリ",         // category (-ory)
  "アクセサリ",       // accessory (-ory)
  "ヒストリ",         // history (-ory)
  "インベントリ",     // inventory (-ory)
  "トレジャリ",       // treasury (-ury)
  "ファクトリ",       // factory (-ory)
  "テリトリ",         // territory (-ory)

  // -ary
  "ライブラリ",       // library (-ary)
  "バイナリ",         // binary (-ary)
  "プライマリ",       // primary (-ary)
  "セカンダリ",       // secondary (-ary)
  "グロッサリ",       // glossary (-ary)
  "バウンダリ",       // boundary (-ary)
  "テンポラリ",       // temporary (-ary)

  // -ry (-ory/-ary 以外)
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

  // -cy
  "レガシ",           // legacy (-cy)
  "プライバシ",       // privacy (-cy)
  "デペンデンシ",     // dependency (-cy)
  "コンカレンシ",     // concurrency (-cy)
  "コンシステンシ",   // consistency (-cy)

  // -gy
  "テクノロジ",       // technology (-gy)
  "ストラテジ",       // strategy (-gy)
  "トポロジ",         // topology (-gy)
  "メソドロジ",       // methodology (-gy)

  // -my
  "タクソノミ",       // taxonomy (-my)

  // -py
  "エントロピ",       // entropy (-py)

  // -ure
  "アーキテクチャ",         // architecture (-ure)
  "シグネチャ",             // signature (-ure)
  "インフラストラクチャ",   // infrastructure (-ure)
  "プロシージャ",           // procedure (-ure)
] };
