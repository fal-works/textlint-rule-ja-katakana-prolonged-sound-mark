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

/** DictEntry から付随語（derived + falsePositives）を取得する。 */
function associatedWords(entry: DictEntry): string[] {
  if (typeof entry === 'string') return [];
  return [...(entry.derived ?? []), ...(entry.falsePositives ?? [])];
}

function toggleProlongedSoundMark(word: string): string {
  return word.endsWith("ー") ? word.slice(0, -1) : word + "ー";
}

/**
 * 辞書ソースをバリデーションし、エラーメッセージの配列を返す。
 * 空配列ならバリデーション成功。
 */
export function validate(sources: Map<string, DictSource>): string[] {
  const errors: string[] = [];

  // 末尾長音符有無のバリデーション（付随語を含む）
  for (const [name, source] of sources) {
    for (const entry of source.requireMark ?? []) {
      const word = entryWord(entry);
      if (!word.endsWith("ー")) {
        errors.push(`${name}: 「${word}」が「ー」で終わっていません`);
      }
      for (const assoc of associatedWords(entry)) {
        if (!assoc.endsWith("ー")) {
          errors.push(`${name}: 「${assoc}」（「${word}」の付随語）が「ー」で終わっていません`);
        }
      }
    }
    for (const entry of source.requireNoMark ?? []) {
      const word = entryWord(entry);
      if (word.endsWith("ー")) {
        errors.push(`${name}: 「${word}」が「ー」で終わっています`);
      }
      for (const assoc of associatedWords(entry)) {
        if (assoc.endsWith("ー")) {
          errors.push(`${name}: 「${assoc}」（「${word}」の付随語）が「ー」で終わっています`);
        }
      }
    }
  }

  // 付随語の後方一致関係の検証
  for (const [name, source] of sources) {
    for (const policy of ['requireMark', 'requireNoMark'] as const) {
      for (const entry of source[policy] ?? []) {
        if (typeof entry === 'string') continue;
        const baseWrong = toggleProlongedSoundMark(entry.word);
        for (const assoc of [...(entry.derived ?? []), ...(entry.falsePositives ?? [])]) {
          const assocWrong = toggleProlongedSoundMark(assoc);
          if (!assocWrong.endsWith(baseWrong)) {
            errors.push(
              `${name}: 「${assoc}」の誤表記「${assocWrong}」が基幹語「${entry.word}」の誤表記「${baseWrong}」で終わっていません`
            );
          }
        }
      }
    }
  }

  // 全ソース横断の重複検知（付随語を含む）
  const seen = new Map<string, string>();

  for (const [name, source] of sources) {
    const allEntries = [
      ...(source.requireMark ?? []),
      ...(source.requireNoMark ?? []),
      ...(source.allowBoth ?? []),
    ];
    for (const entry of allEntries) {
      for (const word of [entryWord(entry), ...associatedWords(entry)]) {
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

  // 単体エントリの冗長性検査: あるトップレベルエントリ X の誤表記が、
  // 別のトップレベルエントリ Y の誤表記で endsWith に該当する場合、
  // X は Y の後方一致で検出可能なので、derived/falsePositives に移行するか削除すべき。
  const topLevelEntries: Array<{ word: string; source: string }> = [];
  for (const [name, source] of sources) {
    for (const policy of ['requireMark', 'requireNoMark'] as const) {
      for (const entry of source[policy] ?? []) {
        topLevelEntries.push({ word: entryWord(entry), source: name });
      }
    }
  }
  for (const x of topLevelEntries) {
    const wx = toggleProlongedSoundMark(x.word);
    for (const y of topLevelEntries) {
      if (x === y) continue;
      const wy = toggleProlongedSoundMark(y.word);
      if (wx.length > wy.length && wx.endsWith(wy)) {
        errors.push(
          `${x.source}: 「${x.word}」は別エントリ「${y.word}」(${y.source}) の後方一致で検出可能です。明示登録（derived または falsePositives）に移行するか削除してください`
        );
        break;
      }
    }
  }

  return errors;
}

/**
 * 各ソースから runtime 用の誤表記・正表記配列を生成する。
 *
 * - `wrongForms`: requireMark / requireNoMark の語と付随語のトグル形
 * - `correctForms`: requireMark / requireNoMark の語と derived の正表記、
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
      for (const assoc of associatedWords(entry)) {
        wrongForms.push(toggleProlongedSoundMark(assoc));
      }
      if (typeof entry !== 'string') {
        for (const derived of entry.derived ?? []) {
          correctForms.push(derived);
        }
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
