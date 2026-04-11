/**
 * 辞書ビルドのコアロジック。
 *
 * バリデーションと誤表記生成を行う純粋関数を提供する。
 * 副作用（ファイル書き出し等）は担当しない。
 */

import type { DictSource } from './types.ts';

/**
 * 辞書ソースをバリデーションし、エラーメッセージの配列を返す。
 * 空配列ならバリデーション成功。
 */
export function validate(sources: Map<string, DictSource>): string[] {
  const errors: string[] = [];

  // 末尾長音符有無のバリデーション
  for (const [name, { requireMark = [], requireNoMark = [] }] of sources) {
    for (const word of requireMark) {
      if (!word.endsWith("ー")) {
        errors.push(`${name}: 「${word}」が「ー」で終わっていません`);
      }
    }
    for (const word of requireNoMark) {
      if (word.endsWith("ー")) {
        errors.push(`${name}: 「${word}」が「ー」で終わっています`);
      }
    }
  }

  // 全ソース横断の重複検知
  const seen = new Map<string, string>();

  for (const [name, { requireMark = [], requireNoMark = [], allowBoth = [] }] of sources) {
    for (const word of [...requireMark, ...requireNoMark, ...allowBoth]) {
      const prev = seen.get(word);
      if (prev) {
        const where = prev === name ? `${name} 内で` : `${prev} と ${name} の間で`;
        errors.push(`重複: 「${word}」が ${where} 重複しています`);
      } else {
        seen.set(word, name);
      }
    }
  }

  // 長音符トグル形の衝突検知
  for (const [name, { requireMark = [], requireNoMark = [], allowBoth = [] }] of sources) {
    for (const word of [...requireMark, ...requireNoMark, ...allowBoth]) {
      const toggled = toggleProlongedSoundMark(word);
      const other = seen.get(toggled);
      if (other) {
        const where = other === name ? `${name} 内で` : `${other} と ${name} の間で`;
        errors.push(`衝突: 「${word}」と「${toggled}」が ${where} 衝突しています`);
      }
    }
  }

  return errors;
}

/**
 * 各ソースの語の長音符をトグルし、誤表記の配列を生成する。
 * "allow-both" のソースは登録対象外（正誤の区別がないため）。
 */
export function generateWrongForms(sources: Map<string, DictSource>): string[] {
  const result: string[] = [];
  for (const [_name, { requireMark = [], requireNoMark = [] }] of sources) {
    for (const word of [...requireMark, ...requireNoMark]) {
      result.push(toggleProlongedSoundMark(word));
    }
  }
  return result;
}

function toggleProlongedSoundMark(word: string): string {
  return word.endsWith("ー") ? word.slice(0, -1) : word + "ー";
}

/**
 * lib/dictionary.js の内容を文字列として生成する。
 */
export function renderModule(wrongForms: string[]): string {
  const entries = wrongForms.map((w) => `  "${w}",`).join("\n");
  return `\
// このファイルは辞書ビルド処理により自動生成されています。
// 手動で編集しないでください。

/**
 * 誤表記とみなすカタカナ語の集合。
 */
export const wrongForms = new Set([
${entries}
]);
`;
}
