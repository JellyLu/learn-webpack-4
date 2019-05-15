const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/app.js',
  output: {
    filename: './app.bundle.js'
  },
  devServer: {
    port: 9000,
    open: true
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
        collapseWhitespace: false,
      },
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css'
    })
  ]
};