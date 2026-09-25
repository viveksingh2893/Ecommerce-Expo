module.exports = {
  extends: ['expo'],
  rules: {
    // Catch accidental debug logs left in code
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    // Disallow unused variables (catches dead code early)
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // Disallow explicit `any` — use `unknown` instead
    '@typescript-eslint/no-explicit-any': 'error',

    // Require explicit return types on exported functions
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Prefer const
    'prefer-const': 'error',

    // No var
    'no-var': 'error',
  },
  ignorePatterns: ['node_modules/', '.expo/', 'dist/', 'scripts/'],
};
