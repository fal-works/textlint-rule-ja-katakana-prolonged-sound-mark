# Dictionary

辞書の一次データ（単語リスト）、辞書ビルダー、登録補助ツールを管理する。

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
