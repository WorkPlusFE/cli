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
  rules: {},
}
