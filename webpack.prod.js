const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackZipPlugin = require('webpack-zip-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new WebpackZipPlugin({
      frontShell: 'ls',
      initialFile: './dist',
      endPath: './build',
      zipName: 'SearchingForNed.zip',
      behindShell: "echo 'File size: ' && stat --printf='%s' build/*"
    })
  ]
});