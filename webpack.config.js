const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/app.js',
  output: {
    filename: './app.bundle.js'
  },
  module:  {
    rules: [{
      test: /\.scss/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.template.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css'
    })
  ]
};