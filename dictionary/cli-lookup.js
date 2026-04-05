import { createInterface } from 'node:readline';
import { parseArgs } from 'node:util';
import regularWithMark from './dict-regular-with-mark.js';
import regularWithoutMark from './dict-regular-without-mark.js';
import conventionalWithMark from './dict-conventional-with-mark.js';
import conventionalWithoutMark from './dict-conventional-without-mark.js';
import allowedBoth from './dict-allowed-both.js';

const { values, positionals } = parseArgs({
  options: {
    unregistered: { type: 'boolean', short: 'u', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
  allowPositionals: true,
});

function printHelp() {
  process.stdout.write(`\
Usage: node dictionary/cli-lookup.js [--unregistered] [word ...]

Options:
  -u, --unregistered  Output only unregistered words (one per line)
  -h, --help          Show this help

Input:
  Words as arguments, or newline-separated from stdin if no arguments given.

Output (default):
  word<TAB>filename        (registered)
  word<TAB>(unregistered)  (not found)

Output (--unregistered):
  word  (unregistered words only, one per line)

Notes:
  Lookup normalizes the trailing prolonged sound mark (ー):
  querying "メモリー" will match the registered form "メモリ".
`);
}

/** @type {Map<string, string>} */
const wordMap = new Map();
for (const { file, source } of [
  { file: 'dict-regular-with-mark.js', source: regularWithMark },
  { file: 'dict-regular-without-mark.js', source: regularWithoutMark },
  { file: 'dict-conventional-with-mark.js', source: conventionalWithMark },
  { file: 'dict-conventional-without-mark.js', source: conventionalWithoutMark },
  { file: 'dict-allowed-both.js', source: allowedBoth },
]) {
  for (const word of source.words) {
    wordMap.set(word, file);
  }
}

/** @param {string} word */
function toggle(word) {
  return word.endsWith('ー') ? word.slice(0, -1) : word + 'ー';
}

/** @param {string} word */
function lookup(word) {
  return wordMap.get(word) ?? wordMap.get(toggle(word)) ?? null;
}

async function readStdin() {
  const words = /** @type {string[]} */ ([]);
  const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
  for await (const line of rl) {
    const w = line.trim();
    if (w) words.push(w);
  }
  return words;
}

if (values.help) {
  printHelp();
} else {
  const words = positionals.length > 0 ? positionals : await readStdin();
  for (const word of words) {
    const file = lookup(word);
    if (values.unregistered) {
      if (!file) process.stdout.write(word + '\n');
    } else {
      process.stdout.write(word + '\t' + (file ?? '(unregistered)') + '\n');
    }
  }
}
