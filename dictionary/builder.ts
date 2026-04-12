/**
 * 辞書ビルドのコアロジック。
 *
 * バリデーションと誤表記生成を行う純粋関数を提供する。
 * 副作用（ファイル書き出し等）は担当しない。
 */

import type { DictEntry, DictSource } from './types.ts';

/** DictEntry から語の文字列を取得する。 */
function entryWord(entry: DictEntry): string {
  return typeof entry === 'string' ? entry : entry.word;
}

/** DictEntry から variants を取得する。 */
function variantWords(entry: DictEntry): string[] {
  if (typeof entry === 'string') return [];
  return entry.variants ?? [];
}

/** DictEntry から falsePositives を取得する。 */
function falsePositiveWords(entry: DictEntry): string[] {
  if (typeof entry === 'string') return [];
  return entry.falsePositives ?? [];
}

function toggleProlongedSoundMark(word: string): string {
  return word.endsWith("ー") ? word.slice(0, -1) : word + "ー";
}

type TopLevelPolicy = 'requireMark' | 'requireNoMark' | 'allowBoth';

type TopLevelEntryInfo = {
  word: string;
  source: string;
  policy: TopLevelPolicy;
  variants: string[];
  falsePositives: string[];
};

function entryForms(entry: TopLevelEntryInfo): string[] {
  return [entry.word, toggleProlongedSoundMark(entry.word)];
}

function collectTopLevelEntries(sources: Map<string, DictSource>): TopLevelEntryInfo[] {
  const result: TopLevelEntryInfo[] = [];

  for (const [name, source] of sources) {
    for (const policy of ['requireMark', 'requireNoMark'] as const) {
      for (const entry of source[policy] ?? []) {
        result.push({
          word: entryWord(entry),
          source: name,
          policy,
          variants: variantWords(entry),
          falsePositives: falsePositiveWords(entry),
        });
      }
    }
    for (const word of source.allowBoth ?? []) {
      result.push({
        word,
        source: name,
        policy: 'allowBoth',
        variants: [],
        falsePositives: [],
      });
    }
  }

  return result;
}

/**
 * 辞書ソースをバリデーションし、エラーメッセージの配列を返す。
 * 空配列ならバリデーション成功。
 */
export function validate(sources: Map<string, DictSource>): string[] {
  const errors: string[] = [];

  const topLevelEntries = collectTopLevelEntries(sources);
  const topLevelByWord = new Map(topLevelEntries.map((entry) => [entry.word, entry]));

  // 末尾長音符有無のバリデーション（variants を含む）
  for (const [name, source] of sources) {
    for (const entry of source.requireMark ?? []) {
      const word = entryWord(entry);
      if (!word.endsWith("ー")) {
        errors.push(`${name}: 「${word}」が「ー」で終わっていません`);
      }
      for (const variant of variantWords(entry)) {
        if (!variant.endsWith("ー")) {
          errors.push(`${name}: 「${variant}」（「${word}」の variants）が「ー」で終わっていません`);
        }
      }
    }
    for (const entry of source.requireNoMark ?? []) {
      const word = entryWord(entry);
      if (word.endsWith("ー")) {
        errors.push(`${name}: 「${word}」が「ー」で終わっています`);
      }
      for (const variant of variantWords(entry)) {
        if (variant.endsWith("ー")) {
          errors.push(`${name}: 「${variant}」（「${word}」の variants）が「ー」で終わっています`);
        }
      }
    }
  }

  // variants の後方一致関係の検証
  for (const [name, source] of sources) {
    for (const policy of ['requireMark', 'requireNoMark'] as const) {
      for (const entry of source[policy] ?? []) {
        if (typeof entry === 'string') continue;
        const baseWrong = toggleProlongedSoundMark(entry.word);
        for (const variant of entry.variants ?? []) {
          const variantWrong = toggleProlongedSoundMark(variant);
          if (!variantWrong.endsWith(baseWrong)) {
            errors.push(
              `${name}: 「${variant}」の誤表記「${variantWrong}」が基幹語「${entry.word}」の誤表記「${baseWrong}」で終わっていません`
            );
          }
        }
      }
    }
  }

  // falsePositives の cross-reference 検証
  for (const [name, source] of sources) {
    for (const policy of ['requireMark', 'requireNoMark'] as const) {
      for (const entry of source[policy] ?? []) {
        if (typeof entry === 'string') continue;
        const baseWrong = toggleProlongedSoundMark(entry.word);
        for (const falsePositive of entry.falsePositives ?? []) {
          const target = topLevelByWord.get(falsePositive);
          if (!target) {
            errors.push(
              `${name}: 「${falsePositive}」は「${entry.word}.falsePositives」で参照されていますが、辞書内に top-level 登録されていません`
            );
            continue;
          }
          if (!entryForms(target).some((form) => form.endsWith(baseWrong))) {
            errors.push(
              `${name}: 「${falsePositive}」のどの形も基幹語「${entry.word}」の誤表記「${baseWrong}」で終わっていません`
            );
          }
        }
      }
    }
  }

  // 全ソース横断の重複検知（top-level + variants）
  const seen = new Map<string, string>();

  for (const [name, source] of sources) {
    const allEntries = [
      ...(source.requireMark ?? []),
      ...(source.requireNoMark ?? []),
      ...(source.allowBoth ?? []),
    ];
    for (const entry of allEntries) {
      for (const word of [entryWord(entry), ...variantWords(entry)]) {
        const prev = seen.get(word);
        if (prev) {
          const where = prev === name ? `${name} 内で` : `${prev} と ${name} の間で`;
          errors.push(`重複: 「${word}」が ${where} 重複しています`);
        } else {
          seen.set(word, name);
        }
      }
    }
  }

  // 長音符トグル形の衝突検知
  for (const [word, name] of seen) {
    const toggled = toggleProlongedSoundMark(word);
    const other = seen.get(toggled);
    if (other) {
      const where = other === name ? `${name} 内で` : `${other} と ${name} の間で`;
      errors.push(`衝突: 「${word}」と「${toggled}」が ${where} 衝突しています`);
    }
  }

  // 単体エントリの冗長性検査: X の任意の形が Y の wrongForm に後方一致するなら、
  // X は Y から variants / falsePositives として言及されているべき。
  for (const x of topLevelEntries) {
    for (const y of topLevelEntries) {
      if (x.word === y.word || y.policy === 'allowBoth') continue;
      const yWrong = toggleProlongedSoundMark(y.word);
      const overlaps = entryForms(x).some((form) => form.length > yWrong.length && form.endsWith(yWrong));
      if (overlaps && !y.variants.includes(x.word) && !y.falsePositives.includes(x.word)) {
        errors.push(
          `${x.source}: 「${x.word}」は別エントリ「${y.word}」(${y.source}) の後方一致で検出可能です。variants または falsePositives に登録してください`
        );
        break;
      }
    }
  }

  return errors;
}

/**
 * 各ソースから、検査時に参照する誤表記・正表記配列を生成する。
 *
 * - `wrongForms`: requireMark / requireNoMark の語と variants のトグル形
 * - `correctForms`: requireMark / requireNoMark の語と variants の正表記、
 *   および allowBoth の両形
 *
 * いずれも文字数の降順でソートされる。
 */
export function generateForms(sources: Map<string, DictSource>): {
  wrongForms: string[];
  correctForms: string[];
} {
  const wrongForms: string[] = [];
  const correctForms: string[] = [];
  for (const [_name, { requireMark = [], requireNoMark = [] }] of sources) {
    for (const entry of [...requireMark, ...requireNoMark]) {
      wrongForms.push(toggleProlongedSoundMark(entryWord(entry)));
      correctForms.push(entryWord(entry));
      for (const variant of variantWords(entry)) {
        wrongForms.push(toggleProlongedSoundMark(variant));
        correctForms.push(variant);
      }
    }
  }
  for (const [_name, { allowBoth = [] }] of sources) {
    for (const entry of allowBoth) {
      const word = entryWord(entry);
      correctForms.push(word, toggleProlongedSoundMark(word));
    }
  }
  wrongForms.sort((a, b) => b.length - a.length);
  correctForms.sort((a, b) => b.length - a.length);
  return { wrongForms, correctForms };
}

/**
 * lib/dictionary.js の内容を文字列として生成する。
 */
export function renderModule(forms: {
  wrongForms: string[];
  correctForms: string[];
}): string {
  const wrongEntries = forms.wrongForms.map((w) => `  "${w}",`).join("\n");
  const correctEntries = forms.correctForms.map((w) => `  "${w}",`).join("\n");
  return `\
// このファイルは辞書ビルド処理により自動生成されています。
// 手動で編集しないでください。

/**
 * 誤表記とみなすカタカナ語の一覧（文字数の降順）。
 */
export const wrongForms = [
${wrongEntries}
];

/**
 * 正表記として保護するカタカナ語の一覧（文字数の降順）。
 */
export const correctForms = [
${correctEntries}
];
`;
}
