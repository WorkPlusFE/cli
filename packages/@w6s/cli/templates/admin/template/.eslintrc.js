module.exports = {
  root: true,
  extends: ['@w6s'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-cycle': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-restricted-syntax': 0
  },
};
