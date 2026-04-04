/**
 * 慣例を優先する語。
 *
 * 一般規則に反するが、慣用表記を正とする語。正表記を管理する。
 * 各エントリのコメント形式: 英語原語 (語尾パターン) 慣例表記の説明
 *
 * @type {import("./builder.js").DictSource}
 */
export default { rule: "no-check", words: [
  // --- 慣例で末尾ーなしが正: -er/-or/-ar 語尾だが慣例でーが不要な語 ---

  // -er
  "コンパイラ",       // compiler (-er) 規則ではコンパイラー
  "プログラマ",       // programmer (-er) 規則ではプログラマー
  "フォーマッタ",     // formatter (-er) 規則ではフォーマッター
  "スケジューラ",     // scheduler (-er) 規則ではスケジューラー
  "レジスタ",         // register (-er) 規則ではレジスター
  "バリア",           // barrier (-er) 規則ではバリアー
  "キャリア",         // carrier (-er) 規則ではキャリアー
  "フロンティア",     // frontier (-er) 規則ではフロンティアー

  // -or
  "プロセッサ",       // processor (-or) 規則ではプロセッサー
  "コネクタ",         // connector (-or) 規則ではコネクター
  "ラジエータ",       // radiator (-or) 規則ではラジエーター
  "ターミネータ",     // terminator (-or) 規則ではターミネーター
  "トランジスタ",     // transistor (-or) 規則ではトランジスター
  "ドア",             // door (-or) 規則ではドアー
  "フロア",           // floor (-or) 規則ではフロアー

  // -ar
  "リニア",           // linear (-ar) 規則ではリニアー

  // -ear/-air
  "クリア",           // clear (-ear) 規則ではクリアー
  "ペア",             // pair (-air) 規則ではペアー
  "ギア",             // gear (-ear) 規則ではギアー

  // --- 慣例で末尾ーありが正: -er/-or/-ar 以外の語尾で慣例として末尾長音符を保持する語 ---
  "サマリー",         // summary (-ary) 規則ではサマリ
  "レイテンシー",     // latency (-cy) 規則ではレイテンシ
  "フォトグラフィー", // photography (-phy) 規則ではフォトグラフィ
  "カンパニー",       // company (-ny) 規則ではカンパニ
  "コンピテンシー",   // competency (-cy) 規則ではコンピテンシ
  "ポリシー",         // policy (-cy) 規則ではポリシ
] };
