import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import nodePlugin from "eslint-plugin-n";
// import jest from "eslint-plugin-jest";
import importPlugin from "eslint-plugin-import";


export default [
  {
    ignores: ['node_modules', 'dist', "**/*.config.mjs", "**/*.config.js", "tsconfig*.json"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ...js.configs.recommended,
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    files: ["**/*.json"],
    language: "json/json",
    ...json.configs.recommended,
  },
  // {
  //   files: ['**/*.spec.js', '**/*.test.js', '**/*.test.ts', '**/*.spec.ts'],
  //   ...jest.configs['flat/recommended'],
  // },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,json}"],
    // extends: [
    //   eslintConfigPrettier,
    // ],
    plugins: {
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
      "n": nodePlugin
    },
    rules: {
      "import/no-unresolved": "error",
      "no-restricted-syntax": [
        "error",
        {
          "selector": "[object.type=MetaProperty][property.name=env]",
          "message": "Use instead import { env } from 'lib/env'"
        }
      ],
      "n/no-process-env": "error",
      "sort-imports": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/no-restricted-types": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",

      "jsx-a11y/anchor-is-valid": "off",
      "curly": ["error", "all"],
      "no-irregular-whitespace": [
        "error",
        {
          skipTemplates: true,
          skipStrings: true
        }
      ],
      // "no-console": [
      //   "error",
      //   {
      //     allow: ["info", "error", "warn"]
      //   }
      // ],
      "no-irregular-whitespace": "off" // без этого куча ошибок
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true, // чтобы находил типы из @types/*
        },
      }
    }
  },
];