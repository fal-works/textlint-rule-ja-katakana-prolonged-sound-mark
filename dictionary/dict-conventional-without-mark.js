/**
 * Microsoft の運用に倣って慣例表記を優先する語のうち、末尾長音符なしを正表記とするもの。
 *
 * 採録条件:
 * - Microsoft の原則に従うと末尾長音符ありが正表記になる語
 * - かつ Microsoft のドキュメントなどで慣例優先の表記が使用されているもの
 *
 * 登録対象の語:
 * - 末尾長音符なしで表記された語
 *
 * @type {import("./builder.js").DictSource}
 */
export default {
  requireNoMark: [
    // -er
    "コンパイラ",       // compiler (-er)
    "プログラマ",       // programmer (-er)
    "フォーマッタ",     // formatter (-er)
    "スケジューラ",     // scheduler (-er)
    "レジスタ",         // register (-er)
    "バリア",           // barrier (-er)
    "キャリア",         // carrier (-er)
    "フロンティア",     // frontier (-er)
    "イニシャライザ",   // initializer (-er)
    "オプティマイザ",   // optimizer (-er)
    "シリアライザ",     // serializer (-er)
    "デシリアライザ",   // deserializer (-er)
    "インデクサ",       // indexer (-er)
    "コンプレッサ",     // compressor (-er) Microsoft のドキュメントでも揺れているので慣例に従う
    "マルチプレクサ",   // multiplexer (-er) 同上

    // -or
    "アクセラレータ",   // accelerator (-or)
    "プロセッサ",       // processor (-or)
    "コネクタ",         // connector (-or)
    "ラジエータ",       // radiator (-or)
    "ターミネータ",     // terminator (-or)
    "トランジスタ",     // transistor (-or)
    "ドア",             // door (-or)
    "フロア",           // floor (-or)
    "アクチュエータ",   // actuator (-or) Microsoft のドキュメントでも揺れているので慣例に従う

    // -ear
    "リニア",           // linear (-ear)
    "クリア",           // clear (-ear)
    "ギア",             // gear (-ear)

    // -air
    "ペア",             // pair (-air) 長音符を付けても4文字に満たない
  ]
};
