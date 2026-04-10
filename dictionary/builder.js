/**
 * 辞書ビルドのコアロジック。
 *
 * バリデーションと誤表記生成を行う純粋関数を提供する。
 * 副作用（ファイル書き出し等）は担当しない。
 */

/**
 * 辞書ソース。
 *
 * 各フィールドの名前が辞書生成時の検査方法と収録方法を決定する。
 *
 * - `requireMark`: 末尾長音符ありを正表記とする語
 * - `requireNoMark`: 末尾長音符なしを正表記とする語
 * - `allowBoth`: 末尾長音符の有無を両方とも正表記として許容する語
 *
 * @typedef {{
 *   requireMark?: string[],
 *   requireNoMark?: string[],
 *   allowBoth?: string[],
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
  /** @type {Map<string, string>} word → source name */
  const seen = new Map();

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
 *
 * @param {Map<string, DictSource>} sources
 * @returns {string[]}
 */
export function generateWrongForms(sources) {
  /** @type {string[]} */
  const result = [];
  for (const [_name, { requireMark = [], requireNoMark = [] }] of sources) {
    for (const word of [...requireMark, ...requireNoMark]) {
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
