/**
 * 辞書ソース。
 *
 * 各フィールドの名前が辞書生成時の検査方法と収録方法を決定する。
 */
export interface DictSource {
  /** 末尾長音符ありを正表記とする語。 */
  requireMark?: string[];

  /** 末尾長音符なしを正表記とする語。 */
  requireNoMark?: string[];

  /** 末尾長音符の有無を両方とも正表記として許容する語。 */
  allowBoth?: string[];
}
