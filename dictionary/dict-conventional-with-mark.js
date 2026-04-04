/**
 * Microsoft の運用に倣って慣例表記を優先する語のうち、末尾長音符ありを正表記とするもの。
 *
 * 採録条件:
 * - 原則（語尾が -er/-or/-ar 以外かつ長音符含め4音節以上なら末尾長音符なし）に反するほうの表記が慣例として定着している語
 * - かつ Microsoft のドキュメントなどでも実際に慣例優先の表記が使用されているもの
 *
 * 登録対象の語:
 * - 末尾長音符ありで表記された語
 *
 * 用途:
 * - ここに登録されたほうの表記を正表記として扱う
 *
 * @type {import("./builder.js").DictSource}
 */
export default {
  rule: "require-mark", words: [
    // -cy
    "コンピテンシー",   // competency (-cy) スタイルガイドに例外として明記
    "ポリシー",         // policy (-cy) 同上
    "コンカレンシー",     // concurrency (-cy) Microsoft のドキュメントでも末尾長音符あり
    "コンシステンシー",   // consistency (-cy) 同上
    "レガシー",          // legacy (-cy) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "プライバシー",      // privacy (-cy) 同上
    "レイテンシー",      // latency (-cy) 同上

    // -gy
    "テクノロジ",       // technology (-gy) Microsoft のドキュメントでも揺れているので自然なほうを選択
    "ストラテジ",       // strategy (-gy) 同上
    "トポロジ",         // topology (-gy) 同上
    "メソドロジ",       // methodology (-gy) 同上

    // other
    "サマリー",         // summary (-ary) スタイルガイドに例外として明記
    "フォトグラフィー", // photography (-phy) 同上
    "カンパニー",       // company (-ny) 同上
  ]
};
