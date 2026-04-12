import type { CategoryName } from '../categories.ts';
import { CATEGORIES } from '../categories.ts';
import { sourceByCategory } from '../sources.ts';

const wordMap = new Map<string, { category: CategoryName; key: string }>();
for (const { name } of CATEGORIES) {
  const source = sourceByCategory.get(name);
  if (!source) continue;
  for (const key of ['requireMark', 'requireNoMark', 'allowBoth'] as const) {
    const entries = source[key];
    if (!entries) continue;
    for (const entry of entries) {
      // 基幹語と付随語（variants / falsePositives）を同じ category/key で索引する。
      // 付随語は基幹語と同じ MarkPolicy を継承するため、分類上も同じ扱いでよい。
      const words = typeof entry === 'string'
        ? [entry]
        : [entry.word, ...(entry.variants ?? []), ...(entry.falsePositives ?? [])];
      for (const word of words) {
        wordMap.set(word, { category: name, key });
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
export function lookup(word: string): { category: CategoryName; key: string } | null {
  return wordMap.get(word) ?? wordMap.get(toggle(word)) ?? null;
}
