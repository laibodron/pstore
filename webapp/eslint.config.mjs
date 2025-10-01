import generalConfig from '../eslint.config.mjs';
import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  // pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  ...generalConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      }
    },
    rules: {
      "no-restricted-imports": "off",
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          'patterns': [{
            'group': [
              '@pstore/backend/**',
              '!@pstore/backend/**/',
              '!@pstore/backend/**/input',
              '!@pstore/backend/src/utils/can'
            ],
            'allowTypeImports': true,
            'message': 'Only types and input schemas are allowed to be imported from backend workspace'
          }]
        }
      ],
      "no-console": [
        "error",
        {
          allow: ["info", "error", "warn"]
        }
      ],
    }
  },
  {
    files: ['./vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.node.json',
        tsconfigRootDir: import.meta.dirname,
      }
    }
  }
]);