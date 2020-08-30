const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  mode: 'development',
  entry: {
    dev: './src/dev.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  }
});