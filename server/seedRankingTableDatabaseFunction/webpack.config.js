const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    handler: './index.js',
    test: './test/allTests.unit.test.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `[name].bundle.js`
  },
  plugins: [
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(require("config")),
    }),
  ],
};
