import type { DictSource } from './types.ts';

/**
 * 英語原語の語尾が -ry（-ory, -ary を含む）のカタカナ語。
 *
 * 原則に従えば末尾長音符なしが正表記。
 */
const dict: DictSource = {
  requireMark: [
    // -ry
    "サマリー",         // summary (-ry) スタイルガイドに例外として明記
    "バッテリー",       // battery (-ry) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "デリバリー",       // delivery (-ry) 同上
    "リカバリー",       // recovery (-ry) 同上
    "ギャラリー",       // gallery (-ry) Microsoft のドキュメントでも末尾長音符あり
    "ディスカバリー",   // discovery (-ry) 同上
    "インダストリー",   // industry (-ry) 同上
    "ドキュメンタリー", // documentary (-ry) 同上
    "ジオメトリー",     // geometry (-ry) Microsoft のドキュメントでは末尾長音符なしだけがヒットするが不自然
    "ディクショナリー", // dictionary (-ry) Microsoft のドキュメントでは末尾長音符なしだけがヒットするが不自然    
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

    // -ry
    "レジストリ",       // registry (-ry)
    "エントリ",         // entry (-ry)
    "クエリ",           // query (-ry)
    "テレメトリ",       // telemetry (-ry)
  ],
};
export default dict;
