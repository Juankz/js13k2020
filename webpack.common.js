const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: 'head',
  })
  ],
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};