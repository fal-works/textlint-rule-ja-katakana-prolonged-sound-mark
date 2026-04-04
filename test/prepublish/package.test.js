/// <reference types="mocha" />
/**
 * パッケージ配布物のE2Eテスト。
 *
 * `pnpm pack` で生成した tarball を `npm install` で一時ディレクトリにインストールし、
 * `.textlintrc.json` と textlint CLI を通じて lint/fix を実行する。
 * ユーザーと同じ導線で動作させることで、以下を担保する:
 *
 * - `package.json` の `files` / `exports` フィールドが正しく、配布物として完全であること
 * - scoped package 名での `.textlintrc` ルール解決が機能すること
 * - textlint の内部APIに依存せず、CLI経由で lint/fix が動作すること
 *
 * 実行に `pnpm pack` + `npm install` を伴うため低速。
 */

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const TEXTLINT_BIN = path.join(REPO_ROOT, "node_modules", ".bin", "textlint");
const RULE_NAME = "@fal-works/ja-katakana-prolonged-sound-mark";

/**
 * `pnpm run` は pnpm 固有の設定を環境変数 `npm_config_*` として注入する。
 * npm がこれらを未知の設定として拒否するのを防ぐため、除外した環境変数を用意する。
 */
const npmCleanEnv = Object.fromEntries(
  Object.entries(process.env).filter(
    ([key]) => !key.startsWith("npm_config_") && !key.startsWith("npm_package_"),
  ),
);

/**
 * `pnpm pack` を実行し、生成された tarball の絶対パスを返す。
 * @param {string} destDir
 * @returns {string}
 */
function packTarball(destDir) {
  const output = execFileSync(
    "pnpm",
    ["pack", "--pack-destination", destDir],
    { cwd: REPO_ROOT, encoding: "utf8" },
  );
  // pnpm pack の最終行が tarball の絶対パス
  const tarball = output.trim().split("\n").pop();
  if (!tarball) throw new Error("pnpm pack produced no output");
  return tarball;
}

/**
 * 一時ディレクトリに tarball をインストールし、設定ファイルとテスト対象を配置する。
 * @param {string} tmpDir
 * @param {string} tarballPath
 */
function setupProject(tmpDir, tarballPath) {
  execFileSync("npm", ["install", "--no-package-lock", tarballPath], {
    cwd: tmpDir,
    env: npmCleanEnv,
  });

  writeFileSync(
    path.join(tmpDir, ".textlintrc.json"),
    JSON.stringify({ rules: { [RULE_NAME]: true } }),
  );

  writeFileSync(path.join(tmpDir, "target.txt"), "ユーザ\n");
}

/**
 * textlint CLI で lint を実行し、JSON 結果を返す。検出時の exit 1 を正常系として扱う。
 * @param {string} cwd
 */
function runTextlintLint(cwd) {
  try {
    execFileSync(TEXTLINT_BIN, ["--format", "json", "target.txt"], {
      cwd,
      encoding: "utf8",
    });
    assert.fail("Expected textlint to exit with code 1 (lint errors found)");
  } catch (/** @type {any} */ error) {
    assert.equal(error.status, 1, `Unexpected exit code: ${error.status}`);
    return JSON.parse(error.stdout);
  }
}

/**
 * textlint CLI で自動修正を実行する。
 * @param {string} cwd
 */
function runTextlintFix(cwd) {
  execFileSync(TEXTLINT_BIN, ["--fix", "target.txt"], { cwd });
}

describe("E2E: .textlintrc からルールを解決して lint/fix できる", () => {
  /** @type {string} */
  let tmpDir;

  before(() => {
    tmpDir = mkdtempSync(path.join(os.tmpdir(), "textlint-e2e-test-"));
    const tarballPath = packTarball(tmpDir);
    setupProject(tmpDir, tarballPath);
  });

  after(() => {
    rmSync(tmpDir, { force: true, recursive: true });
  });

  it("lint: ルール違反を検出する", () => {
    const results = runTextlintLint(tmpDir);

    assert.equal(results.length, 1);
    const messages = results[0].messages;
    assert.equal(messages.length, 1);
    assert.equal(messages[0].ruleId, RULE_NAME);
    assert.match(messages[0].message, /ユーザ.+ユーザー/);
  });

  it("fix: ルール違反を自動修正する", () => {
    runTextlintFix(tmpDir);

    const fixed = readFileSync(path.join(tmpDir, "target.txt"), "utf8");
    assert.equal(fixed, "ユーザー\n");
  });
});
