/**
 * 長音符の扱いに関する方針。
 *
 * - `requireMark`: 末尾長音符ありを正表記とする
 * - `requireNoMark`: 末尾長音符なしを正表記とする
 * - `allowBoth`: 末尾長音符の有無を両方とも正表記として許容する
 */
export type MarkPolicy = 'requireMark' | 'requireNoMark' | 'allowBoth';

/**
 * 辞書エントリ。
 * 単純な文字列か、基幹語に関連語を紐付けたオブジェクト。
 */
export type DictEntry = string | {
  /**
   * 基幹語（所属する `MarkPolicy` に従う正表記）。
   */
  word: string;

  /**
   * 基幹語の派生語（語源・意味を基幹語と共有する語）。
   * 基幹語の `MarkPolicy` を継承し、生成辞書にも追加される。
   *
   * 例: `{ word: "インストーラー", variants: ["アンインストーラー"] }`
   */
  variants?: string[];

  /**
   * 基幹語の後方一致範囲に入るが、派生語ではない独立語への参照。
   * 基幹語エントリには名前だけを記し、実体は辞書のどこかに別エントリとして登録する必要がある。
   * 基幹語と `MarkPolicy` が同じでも異なっていてもよい。
   *
   * 例: `{ word: "ランナー", falsePositives: ["プランナー"] }`
   * ここで runner と planner は語源・意味ともに無関係で、`プランナー` は別エントリとして登録される。
   */
  falsePositives?: string[];
};

/** 辞書ソース。各 {@link MarkPolicy} に対応する語のリストを持つ。 */
export type DictSource = {
  /** 末尾長音符ありを正表記とする語。 */
  requireMark?: DictEntry[];

  /** 末尾長音符なしを正表記とする語。 */
  requireNoMark?: DictEntry[];

  /** 末尾長音符の有無を両方とも正表記として許容する語。 */
  allowBoth?: string[];
};
