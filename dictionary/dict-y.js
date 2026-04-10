/**
 * 英語原語の語尾が -y（-ry, -ty, -phy を除く）のカタカナ語。
 *
 * 原則に従えば末尾長音符ありが正表記。
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

    // -my
    "タクソノミー",     // taxonomy (-my) Microsoft のドキュメントでも末尾長音符あり
    "エコノミー",       // economy (-my) 同上
    "オートノミー",              // autonomy (-my)

    // -py
    "エントロピー",     // entropy (-py) Microsoft のドキュメントでも揺れているので自然なほうを選択

    // -ny
    "カンパニー",       // company (-ny) スタイルガイドに例外として明記

    // -ly
    "ファミリー",       // family (-ly) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "アノマリー",       // anomaly (-ly) 同上
  ],
  requireNoMark: [
    "プロキシ",               // proxy (-xy)
    "アセンブリ",             // assembly (-bly)
  ],
};
