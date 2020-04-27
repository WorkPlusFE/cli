module.exports = {
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: [
    "node"
  ],
  env: {
    "jest": true
  },
  globals: {
    name: 'off'
  },
  rules: {
    "no-console": 0,
    "no-shadow": 0,
    "no-unused-vars": ["error", { "argsIgnorePattern": "colors" }],
  },
}
