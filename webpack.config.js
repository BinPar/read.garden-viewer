// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = [
  {
    entry: './dist/index.js',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'web/js'),
      filename: 'read.garden-viewer.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
  },
  {
    entry: './dist/testApi/index.js',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'web/js'),
      filename: 'read.garden-test-api.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
  }
];