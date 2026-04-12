import type { DictSource } from "./types.ts";

/**
 * 英語原語の語尾が -ry（-ory, -ary を含む）のカタカナ語。
 *
 * 原則に従えば末尾長音符なしが正表記。
 */
const dict: DictSource = {
  requireMark: [
    // -ry
    "サマリー", // summary / スタイルガイドに例外として明記
    "バッテリー", // battery / Microsoft のドキュメントでも揺れているので自然なほうを選択
    "デリバリー", // delivery / 同上
    "リカバリー", // recovery / 同上
    "ギャラリー", // gallery / Microsoft のドキュメントでも末尾長音符あり
    "ディスカバリー", // discovery / 同上
    "インダストリー", // industry / 同上
    "ドキュメンタリー", // documentary / 同上
    "ジオメトリー", // geometry / Microsoft のドキュメントでは末尾長音符なしだけがヒットするが不自然
    "ディクショナリー", // dictionary / Microsoft のドキュメントでは末尾長音符なしだけがヒットするが不自然
  ],
  requireNoMark: [
    // -ory
    "メモリ", // memory
    "ディレクトリ", // directory
    "リポジトリ", // repository
    "カテゴリ", // category
    "アクセサリ", // accessory
    "ヒストリ", // history
    "インベントリ", // inventory
    "ファクトリ", // factory

    // -ary
    "ライブラリ", // library
    "バイナリ", // binary
    "プライマリ", // primary
    "セカンダリ", // secondary
    "バウンダリ", // boundary
    "テンポラリ", // temporary
    "プロプライエタリ", // proprietary
    "アドバーサリ", // adversary

    // -ry
    "レジストリ", // registry
    "エントリ", // entry
    "テレメトリ", // telemetry
    "クエリ", // query
  ],
};
export default dict;
