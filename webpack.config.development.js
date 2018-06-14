const configMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

var config = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: './scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/dist'
  },
  devServer: {
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                autoprefixer({
                  browsers: ['last 2 Chrome versions', 'last 2 Edge versions', 'last 2 Firefox versions'],
                  remove: false // needed to keep -webkit-box-orient properties for line-clamping
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, 'style/style.scss')]
            }
          }
        ]
      }
    ]
  }
};
module.exports = configMerge(baseConfig, config);
