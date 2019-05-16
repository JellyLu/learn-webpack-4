const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'app.bundle': './src/app.js'
  },
  output: {
    filename: '[name].[hash].js'
  },
  devServer: {
    port: 9000,
    open: true,
    hot: true,
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
    }, {
      test: /\.gif$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'images/'
      }
    },
      {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }],
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.template.html',
      minify: {
        collapseWhitespace: false,
      },
    }),
    new CleanWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};