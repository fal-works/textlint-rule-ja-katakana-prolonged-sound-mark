/**
 * 長音符の扱いに関する方針。
 *
 * - `requireMark`: 末尾長音符ありを正表記とする
 * - `requireNoMark`: 末尾長音符なしを正表記とする
 * - `allowBoth`: 末尾長音符の有無を両方とも正表記として許容する
 */
export type MarkPolicy = 'requireMark' | 'requireNoMark' | 'allowBoth';

/**
 * 辞書ソース。各キー（{@link MarkPolicy}）に対応する語のリストを持つ。
 */
export type DictSource = Partial<Record<MarkPolicy, string[]>>;
