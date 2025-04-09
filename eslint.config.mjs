// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  // Add TypeScript-specific rules only
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-function': 'warn'
    }
  }
])
