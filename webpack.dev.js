const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    dev: './src/dev.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  }
});