# textlint-rule-ja-katakana-prolonged-sound-mark

主に情報技術関連の日本語文書を対象に、カタカナ語末尾の長音符（`ー`）の有無を検査して統一する [textlint](https://textlint.github.io/) ルールです。

Microsoft Japanese Localization Style Guide をベースに、より自然な日本語を目指した独自拡張ルールで判定します。
詳細は [ルール仕様](docs/rule-spec.md) を参照してください。

## インストール

```sh
pnpm add -D textlint @fal-works/textlint-rule-ja-katakana-prolonged-sound-mark
```

## 使い方

`.textlintrc.json` にルールを追加します。

```json
{
    "rules": {
        "@fal-works/ja-katakana-prolonged-sound-mark": true
    }
}
```

## 検査内容

辞書に登録された誤表記を検出します。入力カタカナ連続列の末尾と辞書候補との最長一致で判定し、完全一致（語全体）と後方一致（複合語の末尾部分）の両方をカバーします。

| 誤表記         | 正表記       |
| -------------- | ------------ |
| ユーザ         | ユーザー     |
| サーバ         | サーバー     |
| フォルダ       | フォルダー   |
| メモリー       | メモリ       |
| リポジトリー   | リポジトリ   |
| ディレクトリー | ディレクトリ |
| …              | …            |

末尾が辞書の誤表記と一致する複合語も検出されます。例: `ウェブサーバ` → `ウェブサーバー`。

**制限事項**: 複合語の先頭や中間にのみ誤りがある場合（例: `ユーザリスト`）は検出されません（その複合語自体が辞書登録されている場合を除きます）。

## 自動修正

`--fix` オプションで自動修正できます。

```sh
textlint --fix --rule @fal-works/ja-katakana-prolonged-sound-mark <file>
```
