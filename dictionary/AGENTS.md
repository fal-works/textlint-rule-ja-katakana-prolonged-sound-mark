# Dictionary

辞書の一次データ（単語リスト）、辞書ビルダー、登録補助ツールを管理する。

## 辞書ファイル

- `dict-regular-with-mark.js` — 原則通り、末尾長音符あり（require-mark）
- `dict-regular-without-mark.js` — 原則通り、末尾長音符なし（require-no-mark）
- `dict-conventional-with-mark.js` — 慣例優先、末尾長音符あり（require-mark）
- `dict-conventional-without-mark.js` — 慣例優先、末尾長音符なし（require-no-mark）
- `dict-allowed-both.js` — 両表記許容（allow-both）

## ビルド

`pnpm run build:dict` で辞書ソースから `lib/dictionary.js`（誤表記のSet）を生成。`pnpm test` でも実行される。

## ツール

`tools/cli.js` にサブコマンドがある。詳細は `--help` で確認。

```bash
node dictionary/tools/cli.js lookup [--unregistered] [word ...]
node dictionary/tools/cli.js classify < candidates.tsv
```

## 辞書登録ワークフロー

辞書に単語を登録する場合は [ワークフロー](./WORKFLOW.md) を参照。
