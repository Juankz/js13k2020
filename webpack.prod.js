const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackZipPlugin = require('webpack-zip-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackZipPlugin({
      frontShell: 'ls',
      initialFile: './dist',
      endPath: './build',
      zipName: 'SearchingForNed.zip',
      behindShell: "echo 'File size: ' && stat --printf='%s' build/*"
    })
  ]
});