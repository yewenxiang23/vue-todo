const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const isDev = process.env.NODE_ENV === 'development'  //这里的 process.env.NODE_ENV 是node环境的全局变量
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = require('./webpack.config.base')
const devServer = {
  port: '8000',
  host: '0.0.0.0',
  overlay: {
    errors: true,   //错误直接显示在网页上
  },
  hot: true
}

let config
if (isDev) {
  config = merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            }
          ]
        }
      ]
    },
    devServer,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin(),
    ]
  })
} else {
  config = merge(baseConfig, {
    entry:{
      app:path.join(__dirname, '../client/index.js'),
    },
    output:{
      filename: '[name].[chunkhash:8].js',
    },
    module:{
      rules:[
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
            }
          ]
        }
      ]
    },
    plugins:[
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash:8].css',
        chunkFilename: '[id].[chunkhash:8].css',
      }),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin(),
    ],
    optimization:{
      splitChunks: {
        chunks: 'all',  //单独打包node_modules中的依赖
      },
      runtimeChunk: true,
    }
  })
}
module.exports = config