import config from '@jgarber/eslint-config';
import globals from 'globals';

export default [
  {
    ignores: ['dist']
  },
  ...config,
  {
    files: ['**/*.?(m)js'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    files: ['spec/**/*[sS]pec.?(m)js'],
    languageOptions: {
      globals: {
        ...globals.jasmine
      }
    }
  }
];
