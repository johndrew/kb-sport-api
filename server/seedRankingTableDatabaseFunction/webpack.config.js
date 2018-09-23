const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  target: 'node',
  entry: {
    handler: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `handler.js`,
    library: 'handler',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new ZipPlugin(),
  ],
};
