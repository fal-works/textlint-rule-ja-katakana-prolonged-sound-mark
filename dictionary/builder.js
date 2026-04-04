/**
 * 辞書ビルドのコアロジック。
 *
 * バリデーションと誤表記生成を行う純粋関数を提供する。
 * 副作用（ファイル書き出し）は index.js が担当する。
 */

/** @typedef {"require-mark" | "require-no-mark" | "no-check" | "allow-both"} Rule */

/**
 * @typedef {{
 *   words: string[],
 *   rule: Rule,
 * }} DictSource
 */

/**
 * 辞書ソースをバリデーションし、エラーメッセージの配列を返す。
 * 空配列ならバリデーション成功。
 *
 * @param {Map<string, DictSource>} sources
 * @returns {string[]} エラーメッセージの配列
 */
export function validate(sources) {
  /** @type {string[]} */
  const errors = [];

  for (const [name, { words, rule }] of sources) {
    // 末尾長音符有無のバリデーション
    if (rule === "require-mark") {
      for (const word of words) {
        if (!word.endsWith("ー")) {
          errors.push(`${name}: 「${word}」が「ー」で終わっていません`);
        }
      }
    } else if (rule === "require-no-mark") {
      for (const word of words) {
        if (word.endsWith("ー")) {
          errors.push(`${name}: 「${word}」が「ー」で終わっています`);
        }
      }
    }
  }

  // 全ソース横断の重複検知（正表記ベース）
  /** @type {Map<string, string>} word → source name */
  const seen = new Map();

  for (const [name, { words }] of sources) {
    for (const word of words) {
      const prev = seen.get(word);
      if (prev) {
        const where = prev === name ? `${name} 内で` : `${prev} と ${name} の間で`;
        errors.push(`重複: 「${word}」が ${where} 重複しています`);
      } else {
        seen.set(word, name);
      }
    }
  }

  return errors;
}

/**
 * 正表記から誤表記の配列を生成する。
 * rule が "allow-both" のソースは登録対象外。
 *
 * @param {Map<string, DictSource>} sources
 * @returns {string[]}
 */
export function generateWrongForms(sources) {
  /** @type {string[]} */
  const result = [];
  for (const [, { words, rule }] of sources) {
    if (rule === "allow-both") continue;
    for (const word of words) {
      result.push(toWrongForm(word));
    }
  }
  return result;
}

/** @param {string} word */
function toWrongForm(word) {
  return word.endsWith("ー") ? word.slice(0, -1) : word + "ー";
}

/**
 * lib/dictionary.js の内容を文字列として生成する。
 *
 * @param {string[]} wrongForms
 * @returns {string}
 */
export function renderModule(wrongForms) {
  const entries = wrongForms.map((w) => `  "${w}",`).join("\n");
  return `\
// このファイルは dictionary/build.js により自動生成されています。
// 手動で編集しないでください。
export const wrongForms = new Set([
${entries}
]);
`;
}
