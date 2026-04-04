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
    "サマリー",         // summary (-ary)
    "レイテンシー",     // latency (-cy)
    "フォトグラフィー", // photography (-phy)
    "カンパニー",       // company (-ny)
    "コンピテンシー",   // competency (-cy)
    "ポリシー",         // policy (-cy)
  ]
};
