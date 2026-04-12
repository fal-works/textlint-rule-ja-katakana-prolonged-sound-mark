/**
 * 辞書カテゴリの定義と分類ロジック。
 *
 * 各カテゴリは英語語尾のパターンに対応し、
 * 辞書ファイル（dict-{name}.ts）および原則（requireMark / requireNoMark）を決定する。
 */

import type { MarkPolicy } from "./types.ts";

/**
 * 辞書カテゴリの識別名。英語語尾のパターンに対応する。
 */
export type CategoryName = "er-or-ar" | "r-vowels" | "y" | "ry" | "ty" | "phy" | "ure";

/**
 * 辞書カテゴリ。英語語尾のパターンと、それに対応する長音符の原則を持つ。
 */
export interface Category {
  /** カテゴリの識別名。辞書ファイル名 `dict-{name}.ts` に対応する。 */
  name: CategoryName;

  /** 長音符の扱いに関するこのカテゴリの原則。 */
  principle: MarkPolicy;

  /** 英語原語の語尾にマッチする正規表現。 */
  pattern: RegExp;
}

/**
 * カテゴリ定義。評価順序が重要: -ry/-ty/-phy は汎用の -y より先に評価する。
 */
export const CATEGORIES: readonly Category[] = [
  { name: "ry", principle: "requireNoMark", pattern: /ry$/i },
  { name: "ty", principle: "requireNoMark", pattern: /ty$/i },
  { name: "phy", principle: "requireNoMark", pattern: /phy$/i },
  { name: "y", principle: "requireMark", pattern: /y$/i },
  { name: "ure", principle: "requireNoMark", pattern: /ure$/i },
  { name: "er-or-ar", principle: "requireMark", pattern: /[^aeiou](er|or|ar)$/i },
  { name: "r-vowels", principle: "requireNoMark", pattern: /(er|or|ar)$/i },
];

/**
 * 英語原語の語尾からカテゴリを判定する。
 */
export function classify(english: string | null): Category | null {
  if (!english) return null;
  const lc = english.toLowerCase();
  for (const category of CATEGORIES) {
    if (category.pattern.test(lc)) return category;
  }
  return null;
}
