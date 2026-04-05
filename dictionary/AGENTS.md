# Dictionary Editing Guide

このディレクトリでは、本プロジェクトの辞書の一次データを管理する。
辞書エントリを追加・変更する際は、以下のワークフローに従う。

対象: 技術文書・技術記事・ソースコードコメントで使われるカタカナ語。

## Files

- `dict-regular-with-mark.js` — 原則通り、末尾長音符ありを正表記とする語
- `dict-regular-without-mark.js` — 原則通り、末尾長音符なしを正表記とする語
- `dict-conventional-with-mark.js` — 慣例優先で、末尾長音符ありを正表記とする語（原則の例外）
- `dict-conventional-without-mark.js` — 慣例優先で、末尾長音符なしを正表記とする語（原則の例外）
- `dict-allowed-both.js` — 両表記を許容する語

## Workflow

### Step 1: 原則で first guess を決める

英語原語の語尾で判定する。

- 語尾が `-er` / `-or` / `-ar` → `dict-regular-with-mark.js`
- それ以外で、末尾長音符あり表記の文字数が **4 未満** → `dict-regular-with-mark.js`
- それ以外 → `dict-regular-without-mark.js`

> 文字数判定: 小書き文字（ァィゥェォッャュョ）は数えない。`ー` は 1 文字として数える。

### Step 2: Microsoft 日本語ドキュメントで確認が必要か判断する

以下のいずれかに該当する場合は Step 3 へ進む。該当しない場合は first guess を採用し Step 4 へ。

- 同系統の語に conventional 登録が既存辞書に多い
- `-er` / `-or` など、特に技術文脈で表記揺れが起きやすい語尾（Microsoft と JIS の方針が異なるため）
- `-y` など、一般的に表記揺れが起きやすい語尾
- Microsoft Docs で原則と違う表記が使われていそう
- 一般的な技術文書で原則通りの表記に違和感がある
- 訳語として慣用が強そう

### Step 3: Microsoft 日本語ドキュメントを検索する

Microsoft 公式の日本語ページのみを根拠にする。フォーラムや Q&A などのユーザー生成コンテンツは使わない。

検索対象:

- `site:learn.microsoft.com/ja-jp -inurl:/answers/`
- `site:www.microsoft.com/ja-jp`
- 補助: `site:support.microsoft.com/ja-jp`

クエリ例:

```
site:learn.microsoft.com/ja-jp -inurl:/answers/ "シリアライザ"
site:www.microsoft.com/ja-jp "シリアライザ"
```

### Step 4: 分類して登録する

確認結果に応じて登録先とコメント文言を決める。

- **確認不要**（Step 2 で非該当）: `dict-regular-*.js` に登録
- **長音符あり・なし両方ヒット**: `dict-conventional-*.js` に登録（自然なほうを選択）、コメント: `Microsoft のドキュメントでも揺れているので自然なほうを選択`
- **原則に反する表記のみヒット**: `dict-conventional-*.js` に登録、コメント: `Microsoft のドキュメントでも末尾長音符(あり|なし)`
- **ヒットなし・根拠として弱い**: `dict-regular-*.js` にコメントアウトで追加し、メンテナーの判断を仰ぐ

**conventional に登録する際の注意:**
- conventional は「原則から外す根拠がある語」だけに使う
- 「長音符なしだけがヒットした」は単独では conventional の根拠にならない
- 検索結果が少ない・不安定な場合は保守的に `dict-regular-*.js` へ

コメントは既存エントリのパターンに倣う（例: `// compiler (-er) Microsoft のドキュメントでも末尾長音符なし`）。

### Step 5: テストを実行する

```
pnpm test
```
