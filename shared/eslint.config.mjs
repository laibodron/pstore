import generalConfig from '../eslint.config.mjs';
import { defineConfig } from "eslint/config";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  ...generalConfig,
  {
    languageOptions: {
      parserOptions: {
        project: join(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
      }
    }
  }
]);