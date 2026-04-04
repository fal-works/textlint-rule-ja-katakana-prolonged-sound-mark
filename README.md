# textlint-rule-ja-katakana-prolonged-sound-mark

カタカナ語末尾の長音符（`ー`）の有無を検査して統一する [textlint](https://textlint.github.io/) ルールです。

原則としては Microsoft Japanese Localization Style Guide に基づきます。

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

辞書に登録された語のみを完全一致で検査します。辞書にない語はスキップされます。

| 誤表記 | 正表記 |
|--------|--------|
| ユーザ | ユーザー |
| サーバ | サーバー |
| フォルダ | フォルダー |
| メモリー | メモリ |
| リポジトリー | リポジトリ |
| ディレクトリー | ディレクトリ |
| … | … |

詳細は [ルール仕様](docs/rule-spec.md) を参照してください。

**制限事項**: 連続カタカナ完全一致で検出するため、複合語（例: `ユーザリスト`）に含まれる単語は検出されません（その複合語自体が辞書登録されている場合を除きます）。

## 自動修正

`--fix` オプションで自動修正できます。

```sh
textlint --fix --rule @fal-works/ja-katakana-prolonged-sound-mark <file>
```
