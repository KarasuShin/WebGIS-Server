import { baseConfig } from '@karasushin/eslint-config'
import { defineFlatConfig } from 'eslint-define-config'

export default defineFlatConfig([
  ...baseConfig,
  {
    files: ['src/**/*.module.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
])
