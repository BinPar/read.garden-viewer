// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  entry: './dist/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'web/js'),
    filename: 'read.garden-viewer.js'
  }
};