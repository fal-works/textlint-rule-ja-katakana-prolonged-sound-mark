# 辞書登録ワークフロー

対象: 情報系の技術文書・技術記事・ソースコードコメントなどで使われるカタカナ語。

## Step 0: 候補リストを作成

TSV（タブ区切り）で候補リストを作成する。ヘッダー行は `単語<TAB>english<TAB>備考`。
分類情報（登録先ファイル名や `requireMark` / `requireNoMark` など）は含めない。

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
クロージャ	closure	表記揺れが多い
```

## Step 1: CLIツールの classify で原則に基づいた機械分類

```bash
node dictionary/tools/cli.ts classify < candidates.tsv > classified.tsv
```

登録済みの語を除外し、未登録の語に `first-guess` 列と category を付与する。`first-guess` の値は `requireMark` / `requireNoMark` / `unknown`。

原則の詳細は [ルール仕様](../docs/rule-spec.md) を参照。基本的に英語原語の語尾で振り分ける。

## Step 2: 確認が必要な語を判断

`classified.tsv` の各語について、`first-guess` をそのまま採用してよいか判断する。
以下のいずれかに該当する場合は Step 3 へ。該当しなければ `first-guess` を採用し Step 4 へ。

- 同系統の語尾で慣例登録の前例が辞書に多い（例: `-ry` は慣例 `requireMark` が多数）
- `-er`/`-or` で、特に技術文脈でしか使われない語（慣例 `requireNoMark` が多数）
- 一般的な技術文書で原則通りの表記に違和感がある
- 訳語として慣用が強そう

## Step 3: Microsoft 日本語ドキュメントを検索

根拠として参照するのは Microsoft 公式の日本語ページに限定する（フォーラムや Q&A 等のユーザー生成コンテンツは不可）。ただし Microsoft の判断に盲従するのではなく、ドキュメント内で表記揺れが見られる場合はより自然な表記を選択する。

検索対象:

- `site:learn.microsoft.com/ja-jp -inurl:/answers/`
- `site:www.microsoft.com/ja-jp`
- 補助: `site:support.microsoft.com/ja-jp`

## Step 4: 分類を確定して登録

### 登録先ファイルの決定

語の英語語尾に対応するファイルに登録する:

| 英語語尾                  | ファイル           |
| ------------------------- | ------------------ |
| 子音 + -er/-or/-ar        | `dict-er-or-ar.ts` |
| 母音 + -er/-or/-ar        | `dict-r-vowels.ts` |
| -y（-ry, -ty, -phy 以外） | `dict-y.ts`        |
| -ry（-ory, -ary 含む）    | `dict-ry.ts`       |
| -ty（-bility 含む）       | `dict-ty.ts`       |
| -phy                      | `dict-phy.ts`      |
| -ure                      | `dict-ure.ts`      |

### 配列の決定

- 原則通り or 原則通りの表記のみヒット → 原則に対応する配列 (`requireMark`/`requireNoMark`)
- 原則に反する表記のみヒット → 原則と逆の配列（下記注意を参照）
- 両方ヒット → 自然なほうを選択
- ヒットなし・根拠が弱い → 原則通りの配列にコメントアウトで追加

注意: 原則と逆の配列への登録は「原則から外す根拠がある語」だけに使う。検索結果が少ない・不安定な場合は保守的に原則通りへ。

### コメントの書き方

既存エントリのパターンに倣う:

```javascript
// 原則通り
"ユーザー",           // user (-er)
"メモリ",             // memory (-ory)

// 慣例（根拠を付記）
"コンパイラ",         // compiler (-er) Microsoft のドキュメントでも末尾長音符なし
"テクノロジー",       // technology (-gy) Microsoft のドキュメントでも揺れているので自然なほうを選択
```

辞書ファイル内の既存セクションコメント（`// -er`, `// -ory` 等）に合わせて配置する。

## Step 5: テスト

```bash
pnpm test
```
