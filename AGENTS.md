# Introduction

プロジェクト概要:
- 任意の日本語テキストに含まれるカタカナ語末尾の長音符（`ー`）の有無を検査する textlint ルール

プロジェクト構成およびビルドフロー:
- `dictionary/`: 辞書ソース（単語リスト）と辞書ビルダー。ビルドで `lib/dictionary.js` を生成
- `lib/`: textlint rule 本体およびそれが参照する生成済み辞書。npmパッケージには `lib/` のみが含まれる

作業状況やその他の開発管理:
- `dev/` ディレクトリを参照
- `dev/` のサブディレクトリの読み書きを行う際は、まず `dev/AGENTS.md` を確認すること

技術スタック:
- Node.js (dev: v24+, support: v22+)
- TypeScript (v6+)
- `textlint` (v15+)
- テストランナー: Mocha（`textlint-tester` が Mocha ベースのため）
- パッケージマネージャー: pnpm

npm scripts:
- `pnpm test`: 型チェック -> 辞書ビルド -> 各種テスト実行（prepublish以外）
- `pnpm run typecheck`: 型チェックだけ
- `pnpm run build:dict`: 辞書ビルドだけ。辞書ソースから `lib/dictionary.js` を生成
- `pnpm run prepublishOnly`: `pnpm test` + パッケージ構造検証（publish時に自動実行）

一時ファイルの運用:
- 作業過程で一時的に作成するファイルはプロジェクトルート下の `tmp/` ディレクトリ（gitignore対象）に保存する。
  作業後の削除は不要だが、いつ削除されてもよいものを配置すること。

For Codex:
- `pnpm run prepublishOnly` や `pnpm pack`/`npm install` を含むE2Eテストがsandbox内で失敗した場合は、ユーザーに許可を求めて同じコマンドをsandbox外で再実行すること。
