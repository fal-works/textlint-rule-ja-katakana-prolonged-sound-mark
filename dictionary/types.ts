/**
 * 長音符の扱いに関する方針。
 *
 * - `requireMark`: 末尾長音符ありを正表記とする
 * - `requireNoMark`: 末尾長音符なしを正表記とする
 * - `allowBoth`: 末尾長音符の有無を両方とも正表記として許容する
 */
export type MarkPolicy = 'requireMark' | 'requireNoMark' | 'allowBoth';

/**
 * 辞書エントリ。単純な文字列か、派生語・偽同定防止語を持つオブジェクト。
 *
 * - `derived`: 接頭辞による1語の派生語（例: アンインストーラー）
 * - `falsePositives`: 後方一致の偽同定を防止するための語（例: ブリーダー）
 */
export type DictEntry = string | {
  word: string;
  derived?: string[];
  falsePositives?: string[];
};

/**
 * 辞書ソース。各キー（{@link MarkPolicy}）に対応する語のリストを持つ。
 */
export type DictSource = Partial<Record<MarkPolicy, DictEntry[]>>;
