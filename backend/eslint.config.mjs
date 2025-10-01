import generalConfig from '../eslint.config.mjs';
import { defineConfig } from "eslint/config";
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { builtinModules } from "module";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const builtinPattern = `^(${builtinModules.join("|").replace(/\-/g, "\\-")})(/|$)`;
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  ...generalConfig,
  {
    languageOptions: {
      parserOptions: {
        project: join(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
      }
    },
    plugins: {
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      "no-console": "error",
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/**/!(*.integration.test.ts)',
              from: './src/test',
              message:
                'Import something from test dir only inside integration tests',
            },
          ],
        },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1) спец: env и integration тесты
            [
              "^\\.{1,2}(?:/.*)?/env(?=$|/|\\.)",
              "^\\.{1,2}(?:/.*)?/test/integration(?=$|/|\\.)",
            ],

            // 2) node builtin
            ["^node:", builtinPattern],

            // 3) external пакеты
            ["^@?\\w"],

            // 4) parent
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],

            // 5) sibling
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

            // 6) стили (если есть)
            ["^.+\\.s?css$"],
          ],
        },
      ],
    }
  }
]);