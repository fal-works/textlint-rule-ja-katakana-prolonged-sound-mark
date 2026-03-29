# textlint-rule-ja-katakana-prolonged-sound-mark

カタカナ語末尾の長音符（ー）を検査する [textlint](https://textlint.github.io/) ルールです。

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

### 末尾ーを付ける（英語語尾 `-er` / `-or` / `-ar`）

| 誤表記 | 正表記 |
|--------|--------|
| ユーザ | ユーザー |
| サーバ | サーバー |
| フォルダ | フォルダー |
| … | … |

### 末尾ーを削る（英語語尾 `-ory` / `-ary` 等、3音節以上）

| 誤表記 | 正表記 |
|--------|--------|
| メモリー | メモリ |
| リポジトリー | リポジトリ |
| ディレクトリー | ディレクトリ |
| … | … |

### 複合語について

辞書は完全一致のため、辞書エントリをカタカナ連続部分として含む複合語（例: `サーバプール`）はスキップされます。これは設計上の仕様です。

## 自動修正

`--fix` オプションで自動修正できます。

```sh
textlint --fix --rule @fal-works/ja-katakana-prolonged-sound-mark <ファイル>
```
