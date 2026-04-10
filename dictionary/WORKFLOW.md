# 辞書登録ワークフロー

対象: 情報系の技術文書・技術記事・ソースコードコメントなどで使われるカタカナ語。

## Step 0: 候補リストを作成

TSV（タブ区切り）で候補リストを作成する。ヘッダー行は `単語<TAB>english<TAB>備考`。
分類情報（登録先ファイル名や with-mark/without-mark など）は含めない。

- 1行1語
- `#` 行でセクション区切り（英語語尾などでグルーピング）
- 空行は自由
- 英語由来でない場合は `english` 列は空欄

```
単語	english	備考
# -er (プログラミング)
ランナー	runner	CI/CD でのジョブ実行者
チェッカー	checker	型チェッカー等
# -ure
クロージャ	closure	表記ゆれ多
```

## Step 1: classify で機械分類

```bash
node dictionary/tools/cli.js classify < candidates.tsv > classified.tsv
```

登録済みの語を除外し、未登録の語に first-guess（`with-mark` / `without-mark`）と rationale（`er-or-ar` / `short` / `long`）を付与する。

原則のロジック:
1. 英語原語の語尾が `-er` / `-or` / `-ar` → `with-mark`（rationale: `er-or-ar`）
2. 上記以外で末尾長音符あり表記の実効文字数 < 4 → `with-mark`（rationale: `short`）
3. 上記以外 → `without-mark`（rationale: `long`）

実効文字数: 小書き文字（ァィゥェォッャュョ）を除き、`ー` は 1 文字として数える。

## Step 2: 確認が必要な語を判断

classified.tsv の各語について、first-guess をそのまま採用してよいか判断する。
以下のいずれかに該当する場合は Step 3 へ。該当しなければ first-guess を採用し Step 4 へ。

- 同系統の語尾で conventional 登録の前例が辞書に多い（例: `-cy` は conventional-with-mark に多数）
- `-er` / `-or` で、特に技術文脈でしか使われない語（conventional-without-mark に多数）
- `-y` など一般的に表記揺れが多い語尾
- 一般的な技術文書で原則通りの表記に違和感がある
- 訳語として慣用が強そう

## Step 3: Microsoft 日本語ドキュメントを検索

Microsoft 公式の日本語ページのみを根拠にする。フォーラムや Q&A 等のユーザー生成コンテンツは不可。

検索対象:
- `site:learn.microsoft.com/ja-jp -inurl:/answers/`
- `site:www.microsoft.com/ja-jp`
- 補助: `site:support.microsoft.com/ja-jp`

## Step 4: 分類を確定して登録

### 登録先の決定

- 確認不要 or 原則通りの表記のみヒット → `dict-regular-*.js`
- 原則に反する表記のみヒット → `dict-conventional-*.js`（下記注意を参照）
- 両方ヒット → `dict-conventional-*.js`（自然なほうを選択）
- ヒットなし・根拠が弱い → `dict-regular-*.js` にコメントアウトで追加

注意: conventional は「原則から外す根拠がある語」だけに使う。検索結果が少ない・不安定な場合は保守的に regular へ。

### コメントの書き方

既存エントリのパターンに倣う:

```javascript
// regular
"ユーザー",           // user (-er)
"メモリ",             // memory (-ory)

// conventional（根拠を付記）
"コンパイラ",         // compiler (-er) Microsoft のドキュメントでも末尾長音符なし
"テクノロジー",       // technology (-gy) Microsoft のドキュメントでも揺れているので自然なほうを選択
"コンピテンシー",     // competency (-cy) スタイルガイドに例外として明記
```

辞書ファイル内の既存セクションコメント（`// -er`, `// -ory` 等）に合わせて配置する。

## Step 5: テスト

```bash
pnpm test
```
