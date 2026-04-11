import type { DictSource } from './types.ts';

/**
 * 英語原語の語尾が -ure のカタカナ語。
 *
 * 原則に従えば末尾長音符なしが正表記。
 */
const dict: DictSource = {
  requireMark: [
    "エクスポージャー",  // exposure (-ure) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "フィーチャー",      // feature (-ure) Microsoft のドキュメントでも揺れているので自然なほうを選択
  ],
  requireNoMark: [
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
  ],
  allowBoth: [
    "テクスチャ",       // texture (-ure)
  ],
};
export default dict;
