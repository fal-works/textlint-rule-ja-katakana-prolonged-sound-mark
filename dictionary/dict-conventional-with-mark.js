/**
 * Microsoft の運用に倣って慣例表記を優先する語のうち、末尾長音符ありを正表記とするもの。
 *
 * 採録条件:
 * - Microsoft の原則に従うと末尾長音符なしが正表記になる語
 * - かつ Microsoft のドキュメントなどで慣例優先の表記が使用されているもの
 *
 * 登録対象の語:
 * - 末尾長音符ありで表記された語
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
  ]
};
