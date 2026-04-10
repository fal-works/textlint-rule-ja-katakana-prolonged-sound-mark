import { createInterface } from 'node:readline';
import { parseArgs } from 'node:util';
import { lookup } from './lookup.js';
import { applyPrinciple } from './utils.js';

const { values, positionals } = parseArgs({
  options: {
    unregistered: { type: 'boolean', short: 'u', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
  allowPositionals: true,
});

const subcommand = positionals[0];

if (values.help && !subcommand) {
  printTopLevelHelp();
} else if (subcommand === 'lookup') {
  await runLookup(positionals.slice(1));
} else if (subcommand === 'classify') {
  await runClassify();
} else {
  printTopLevelHelp();
  process.exit(1);
}

function printTopLevelHelp() {
  process.stdout.write(`\
Usage: node dictionary/tools/cli.js <subcommand> [options]

Subcommands:
  lookup    辞書の登録状況を照会する
  classify  候補リスト (TSV) を一括分類する

Options:
  -h, --help  Show help

Run with <subcommand> --help for subcommand-specific help.
`);
}

// ─── lookup ───

/** @param {string[]} words */
async function runLookup(words) {
  if (values.help) {
    process.stdout.write(`\
Usage: node dictionary/tools/cli.js lookup [--unregistered] [word ...]

Options:
  -u, --unregistered  Output only unregistered words (one per line)
  -h, --help          Show this help

Input:
  Words as arguments, or newline-separated from stdin if no arguments given.

Output (default):
  word<TAB>filename<TAB>key  (registered)
  word<TAB>(unregistered)      (not found)

Output (--unregistered):
  word  (unregistered words only, one per line)

Notes:
  Lookup normalizes the trailing prolonged sound mark (ー):
  querying "メモリー" will match the registered form "メモリ".
`);
    return;
  }

  const input = words.length > 0 ? words : await readStdinWords();
  for (const word of input) {
    const result = lookup(word);
    if (values.unregistered) {
      if (!result) process.stdout.write(word + '\n');
    } else if (result) {
      process.stdout.write(word + '\t' + result.file + '\t' + result.key + '\n');
    } else {
      process.stdout.write(word + '\t' + '(unregistered)' + '\n');
    }
  }
}

/** stdin から単語を1行ずつ読み取る（空行スキップ） */
async function readStdinWords() {
  const words = /** @type {string[]} */ ([]);
  const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
  for await (const line of rl) {
    const w = line.trim();
    if (w) words.push(w);
  }
  return words;
}

// ─── classify ───

async function runClassify() {
  if (values.help) {
    process.stdout.write(`\
Usage: node dictionary/tools/cli.js classify < candidates.tsv

Reads a TSV candidate list from stdin, filters out registered words,
and outputs unregistered words with their first-guess classification.

Input TSV columns:
  word<TAB>spell<TAB>備考 (optional)

Supports # comment lines (section headers) and blank lines.

Output TSV columns:
  word<TAB>spell<TAB>first-guess<TAB>rationale<TAB>備考

first-guess: with-mark / without-mark / unknown
rationale:   er-or-ar / r-vowels / y / ry / ty-phy / ure
`);
    return;
  }

  const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
  let headerDone = false;
  let skipCount = 0;
  /** @type {string[]} */
  let pendingLines = [];
  let seenDataSinceLastComment = false;

  for await (const line of rl) {
    // 空行
    if (line.trim() === '') {
      pendingLines.push(line);
      continue;
    }

    // コメント行（セクション見出し）
    if (line.startsWith('#')) {
      if (seenDataSinceLastComment) {
        // 新しいセクションの開始 → 前セクションのバッファを破棄
        pendingLines = [];
        seenDataSinceLastComment = false;
      }
      pendingLines.push(line);
      continue;
    }

    // ヘッダー行（最初のデータ的な行）
    if (!headerDone) {
      headerDone = true;
      const cols = line.split('\t');
      const header = [cols[0], cols[1], 'first-guess', 'rationale', ...cols.slice(2)].join('\t');
      process.stdout.write(header + '\n');
      continue;
    }

    // データ行
    seenDataSinceLastComment = true;
    const cols = line.split('\t');
    const word = /** @type {string} */ (cols[0]);
    const spell = cols[1] ?? '';
    const rest = cols.slice(2);

    const found = lookup(word);
    if (found) {
      skipCount++;
      continue;
    }

    // 未登録 → 分類
    const result = applyPrinciple(word, spell || null);
    const firstGuess = result.withMark === true ? 'with-mark'
                     : result.withMark === false ? 'without-mark'
                     : 'unknown';

    // バッファされたセクション見出し・空行をフラッシュ
    for (const pending of pendingLines) {
      process.stdout.write(pending + '\n');
    }
    pendingLines = [];

    process.stdout.write([word, spell, firstGuess, result.rationale ?? '', ...rest].join('\t') + '\n');
  }

  if (skipCount > 0) {
    process.stderr.write(`# ${skipCount} registered words skipped\n`);
  }
}
