import ava from '@jgarber/eslint-config/ava';
import config from '@jgarber/eslint-config';

export default [
  {
    ignores: ['coverage', 'dist']
  },
  ...config,
  ...ava,
  {
    files: ['src/*.js', 'test/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly',
        HTMLElement: 'readonly'
      }
    }
  }
];
