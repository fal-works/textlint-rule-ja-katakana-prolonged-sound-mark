import assert from "node:assert/strict";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import { createLinter } from "textlint";

const require = createRequire(import.meta.url);
const textlintRequire = createRequire(require.resolve("textlint"));
const { TextlintKernelDescriptor } = await import(
  textlintRequire.resolve("@textlint/kernel")
);
const { moduleInterop } = await import(
  textlintRequire.resolve("@textlint/module-interop")
);
const markdownPluginModule = await import(
  textlintRequire.resolve("@textlint/textlint-plugin-markdown")
);

const markdownPlugin = moduleInterop(markdownPluginModule.default);

function copyPublishFiles(repoRoot, packageDir, packageJson) {
  mkdirSync(packageDir, { recursive: true });
  cpSync(path.join(repoRoot, "package.json"), path.join(packageDir, "package.json"));

  for (const relativePath of packageJson.files ?? []) {
    const sourcePath = path.join(repoRoot, relativePath);
    const destinationPath = path.join(packageDir, relativePath);
    cpSync(sourcePath, destinationPath, { recursive: true });
  }
}

describe("公開パッケージの smoke test", () => {
  it("配布物相当の entrypoint を import して lint/fix できる", async () => {
    const repoRoot = path.resolve(import.meta.dirname, "..");
    const tempRoot = mkdtempSync(path.join(os.tmpdir(), "textlint-rule-smoke-"));
    const packageDir = path.join(tempRoot, "package");
    const projectDir = path.join(tempRoot, "project");

    try {
      const packageJson = JSON.parse(
        readFileSync(path.join(repoRoot, "package.json"), "utf8")
      );
      const exportTarget =
        typeof packageJson.exports === "string"
          ? packageJson.exports
          : packageJson.exports?.["."];
      assert.equal(typeof exportTarget, "string");

      // 公開対象だけを一時配置し、その entrypoint 単体で rule として動作することを確認する。
      copyPublishFiles(repoRoot, packageDir, packageJson);

      const entryPoint = path.join(packageDir, exportTarget);
      assert.equal(existsSync(entryPoint), true);

      const importedRule = await import(entryPoint);
      const ruleModule = importedRule.default;

      mkdirSync(projectDir, { recursive: true });
      writeFileSync(path.join(projectDir, "sample.md"), "ユーザ\n");

      const descriptor = new TextlintKernelDescriptor({
        rules: [
          {
            ruleId: "@fal-works/ja-katakana-prolonged-sound-mark",
            rule: ruleModule,
            options: true,
          },
        ],
        plugins: [
          {
            pluginId: "@textlint/textlint-plugin-markdown",
            plugin: markdownPlugin,
            options: true,
          },
        ],
        filterRules: [],
        configBaseDir: projectDir,
      });
      const linter = createLinter({
        descriptor,
        cwd: projectDir,
      });

      const [lintResult] = await linter.lintFiles(["sample.md"]);
      assert.equal(lintResult.messages.length, 1);
      assert.equal(
        lintResult.messages[0].ruleId,
        "@fal-works/ja-katakana-prolonged-sound-mark"
      );
      assert.equal(
        lintResult.messages[0].message,
        "「ユーザ」は「ユーザー」と表記してください。"
      );

      const [fixResult] = await linter.fixFiles(["sample.md"]);
      assert.equal(fixResult.output, "ユーザー\n");
    } finally {
      rmSync(tempRoot, { force: true, recursive: true });
    }
  });
});
