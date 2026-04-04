/**
 * 誤表記のカタカナ語セット。辞書にない語は完全スキップ。
 * 正表記は末尾の長音符（ー）の有無から導出する:
 * - `ー` で終わる語 → ーを削る（例: メモリー → メモリ）
 * - `ー` で終わらない語 → ーを付ける（例: ユーザ → ユーザー）
 * - [例外] 慣用表記が定着しているものは規則に反していても個別に採用/除外
 *
 * 各エントリのコメント形式: 英語原語 (語尾パターン) [採否分類]
 * @type {Set<string>}
 */
export default new Set([
  // 末尾長音符あり: 英語語尾 -er/-or/-ar で末尾 `ー` が欠落した語を登録
  "ユーザ",         // user (-er)
  "パーサ",         // parser (-er)
  "フォルダ",       // folder (-er)
  "プリンタ",       // printer (-er)
  "スキャナ",       // scanner (-er)
  "モニタ",         // monitor (-or)
  "エディタ",       // editor (-or)
  "セレクタ",       // selector (-or)
  "コンテナ",       // container (-er)
  "コンパイラ",     // compiler (-er)
  "デバッガ",       // debugger (-er)
  "マネージャ",     // manager (-er)
  "レジスタ",       // register (-er)
  "ルータ",         // router (-er)
  "サーバ",         // server (-er)
  "ブラウザ",       // browser (-er)

  // 末尾長音符なし: 英語語尾 -er/-or/-ar 以外で、末尾 `ー` が付いており、かつ日本語で4音節以上（長音符を1音節に数える）の語を登録
  "メモリー",       // memory (-ory, メ・モ・リ・ー = 4音節)
  "ディレクトリー", // directory (-ory)
  "リポジトリー",   // repository (-ory)
  "カテゴリー",     // category (-ory)
  "アクセサリー",   // accessory (-ory)
  "ヒストリー",     // history (-ory)
  "インベントリー", // inventory (-ory)
  "トレジャリー",   // treasury (-ury)

  // 両方許容（参考）: 慣用定着のため辞書に含めない例外語
  // "クリア"  // clear (-ear) 規則通りなら「クリアー」が正
]);
