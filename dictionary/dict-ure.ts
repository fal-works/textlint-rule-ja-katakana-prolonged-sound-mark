import type { DictSource } from "./types.ts";

/**
 * 英語原語の語尾が -ure のカタカナ語。
 *
 * 原則に従えば末尾長音符なしが正表記。
 */
const dict: DictSource = {
  requireMark: [
    "エクスポージャー", // exposure/ Microsoft のドキュメントでも揺れているので自然なほうを選択
    "フィーチャー", // feature/ Microsoft のドキュメントでも揺れているので自然なほうを選択
  ],
  requireNoMark: [
    "アーキテクチャ", // architecture
    "シグネチャ", // signature
    "プロシージャ", // procedure
    { word: "クロージャ", variants: ["ディスクロージャ"] }, // closure
    { word: "ストラクチャ", variants: ["インフラストラクチャ"] }, // structure
    "フィクスチャ", // fixture
    "ピクチャ", // picture
    "フューチャ", // future
    "ミクスチャ", // mixture
    "マニュファクチャ", // manufacture
    "ジェスチャ", // gesture
    "ベンチャ", // venture
    "レクチャ", // lecture
  ],
  allowBoth: [
    "テクスチャ", // texture
  ],
};
export default dict;
