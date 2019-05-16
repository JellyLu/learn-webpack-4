const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/app.js',
  output: {
    filename: '[name].[chunkhash].js'
  },
  devServer: {
    port: 9000,
    open: true
  },
  module:  {
    rules: [{
      test: /\.scss/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.template.html',
      minify: {
        collapseWhitespace: false,
      },
    })
  ]
};