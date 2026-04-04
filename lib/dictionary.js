/**
 * 末尾長音符 `ー` の有無について誤用と判定するべきカタカナ語のセット。
 *
 * 各エントリのコメント形式: 英語原語 (語尾パターン等、正表記の根拠)
 *
 * @type {Set<string>}
 */
const wrongForms = new Set([
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

/**
 * 誤表記から正表記を導出する。末尾が `ー` なら削り、そうでなければ付ける。
 *
 * 辞書にない語には `undefined` を返す。
 *
 * @param {string} word
 * @returns {string | undefined}
 */
export function correctForm(word) {
  if (!wrongForms.has(word)) return undefined;
  return word[word.length - 1] === "ー"
    ? word.slice(0, -1)
    : word + "ー";
}
