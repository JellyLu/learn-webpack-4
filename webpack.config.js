const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/app.js',
  output: {
    filename: './app.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Awesome"
    })
  ]
};