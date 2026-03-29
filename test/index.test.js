import _TextLintTesterModule from "textlint-tester";
const TextLintTester = _TextLintTesterModule.default;
import rule from "../src/index.js";

const tester = new TextLintTester();

tester.run("ja-katakana-terminal-long-vowel", rule, {
  valid: [
    // 正表記はエラーなし
    { text: "ユーザーが操作する" },
    { text: "サーバーに接続する" },
    { text: "フォルダーを開く" },
    { text: "メモリが不足している" },
    { text: "ディレクトリの一覧" },
    { text: "リポジトリをクローン" },
    // 辞書外語はスキップ
    { text: "クリアボタン" },
    { text: "テーブルを作成" },
    { text: "データを取得" },
  ],
  invalid: [
    // 末尾ー欠落 → 付加
    {
      text: "ユーザが操作する",
      errors: [{ message: "「ユーザ」は「ユーザー」と表記してください。" }],
      output: "ユーザーが操作する",
    },
    {
      text: "サーバに接続する",
      errors: [{ message: "「サーバ」は「サーバー」と表記してください。" }],
      output: "サーバーに接続する",
    },
    {
      text: "フォルダを開く",
      errors: [{ message: "「フォルダ」は「フォルダー」と表記してください。" }],
      output: "フォルダーを開く",
    },
    // 末尾ー余分 → 削除
    {
      text: "メモリーが不足している",
      errors: [{ message: "「メモリー」は「メモリ」と表記してください。" }],
      output: "メモリが不足している",
    },
    {
      text: "ディレクトリーの一覧",
      errors: [{ message: "「ディレクトリー」は「ディレクトリ」と表記してください。" }],
      output: "ディレクトリの一覧",
    },
    // fix が隣接する他のカタカナ語へ誤適用されないこと
    {
      text: "ユーザとフォルダの一覧",
      errors: [
        { message: "「ユーザ」は「ユーザー」と表記してください。" },
        { message: "「フォルダ」は「フォルダー」と表記してください。" },
      ],
      output: "ユーザーとフォルダーの一覧",
    },
  ],
});
