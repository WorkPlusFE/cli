## mock server

```js
// w6s.config.js
module.exports = {
  ...,
  pluginOptions: {
    mock: {
      prefix: '/mock',
      entry: 'mock/index.js'
    }
  }
}
```