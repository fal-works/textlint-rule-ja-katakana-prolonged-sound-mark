/**
 * Microsoft の運用に倣って慣例表記を優先する語。
 *
 * 採録条件:
 * - 原則に反するほうの表記が慣例として定着している語
 * - かつ Microsoft のドキュメントなどでも実際に慣例優先の表記が使用されているもの
 *
 * 登録対象の語:
 * - 原則に反し、慣例優先で表記された語
 *
 * 用途:
 * - ここに登録されたほうの表記を正表記として扱う
 *
 * @type {import("./builder.js").DictSource}
 */
export default {
  rule: "no-check", words: [
    // --- 原語の語尾が -er/-or/-ar だが慣例として長音符が不要な語 ---

    // -er
    "コンパイラ",       // compiler (-er)
    "プログラマ",       // programmer (-er)
    "フォーマッタ",     // formatter (-er)
    "スケジューラ",     // scheduler (-er)
    "レジスタ",         // register (-er)
    "バリア",           // barrier (-er)
    "キャリア",         // carrier (-er)
    "フロンティア",     // frontier (-er)

    // -or
    "プロセッサ",       // processor (-or)
    "コネクタ",         // connector (-or)
    "ラジエータ",       // radiator (-or)
    "ターミネータ",     // terminator (-or)
    "トランジスタ",     // transistor (-or)
    "ドア",             // door (-or)
    "フロア",           // floor (-or)

    // -ear
    "リニア",           // linear (-ar)
    "クリア",           // clear (-ear)
    "ギア",             // gear (-ear)

    // --- 原語の語尾が -er/-or/-ar 以外かつ音節が十分多いが慣例として末尾長音符を保持する語 ---

    "サマリー",         // summary (-ary)
    "レイテンシー",     // latency (-cy)
    "フォトグラフィー", // photography (-phy)
    "カンパニー",       // company (-ny)
    "コンピテンシー",   // competency (-cy)
    "ポリシー",         // policy (-cy)
  ]
};
