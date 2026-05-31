import pluginAstro from 'eslint-plugin-astro'

export default [
  ...pluginAstro.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
]
