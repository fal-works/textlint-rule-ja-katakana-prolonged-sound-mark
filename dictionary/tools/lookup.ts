import type { CategoryName } from '../categories.ts';
import type { MarkPolicy } from '../types.ts';
import { CATEGORIES } from '../categories.ts';
import { sourceByCategory } from '../sources.ts';

export interface LookupResult {
  category: CategoryName;
  markPolicy: MarkPolicy;
}

const wordMap = new Map<string, LookupResult>();
for (const { name } of CATEGORIES) {
  const source = sourceByCategory.get(name);
  if (!source) continue;
  for (const markPolicy of ['requireMark', 'requireNoMark', 'allowBoth'] as const) {
    const entries = source[markPolicy];
    if (!entries) continue;
    for (const entry of entries) {
      // 基幹語と variants を同じ category/key で索引する。
      // falsePositives は cross-reference のみであり、実体は別エントリとして索引される。
      const words = typeof entry === 'string'
        ? [entry]
        : [entry.word, ...(entry.variants ?? [])];
      for (const word of words) {
        wordMap.set(word, { category: name, markPolicy });
      }
    }
  }
}

function toggle(word: string): string {
  return word.endsWith('ー') ? word.slice(0, -1) : word + 'ー';
}

/**
 * 辞書から語を検索する。末尾長音符の有無を正規化して検索する。
 */
export function lookup(word: string): LookupResult | null {
  return wordMap.get(word) ?? wordMap.get(toggle(word)) ?? null;
}
