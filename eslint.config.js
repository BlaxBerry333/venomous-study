import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(__dirname, "app", "node_modules", ".package-lock.json"));

const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const eslintPluginAstro = require("eslint-plugin-astro");
const eslintConfigPrettier = require("eslint-config-prettier");
const globals = require("globals");

export default [
  {
    ignores: [
      "node_modules/",
      "app/dist/",
      "app/.astro/",
      "__ai__/",
      ".claude/",
      "docs/",
      ".github/",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs}", "**/astro.config.mjs"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  eslintConfigPrettier,
];
