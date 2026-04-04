/**
 * 辞書ビルドのコアロジック。
 *
 * バリデーションと誤表記生成を行う純粋関数を提供する。
 * 副作用（ファイル書き出し等）は担当しない。
 */

/**
 * 辞書ソースに設定するルール。
 *
 * 分類理由（原則vs慣例など）は問わず、辞書生成時の検査方法と収録方法を決定する効果のみを持つ。
 *
 * - `"require-mark"`: 辞書ソースには末尾長音符ありを登録し、これを正表記とする
 * - `"require-no-mark"`: 辞書ソースには末尾長音符なしを登録し、これを正表記とする
 * - `"allow-both"`: 末尾長音符の有無を両方とも正表記として許容（i.e. いずれも誤表記として扱うことを禁止）
 *
 * @typedef {"require-mark" | "require-no-mark" | "allow-both"} Rule
 */

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

  // 全ソース横断の重複検知
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

  // 長音符トグル形の衝突検知
  for (const [name, { words }] of sources) {
    for (const word of words) {
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
 * rule が "allow-both" のソースは登録対象外（正誤の区別がないため）。
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
      result.push(toggleProlongedSoundMark(word));
    }
  }
  return result;
}

/** @param {string} word */
function toggleProlongedSoundMark(word) {
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
