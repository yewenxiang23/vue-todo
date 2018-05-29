const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const isDev = process.env.NODE_ENV === 'development'  //这里的 process.env.NODE_ENV 是node环境的全局变量
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = {
  mode: process.env.NODE_ENV || 'production',  //development || production
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpge|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]',   //输出原文件名和后缀
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin(),  //自动创建 index.html 来包含打包的JS文件
    new webpack.HotModuleReplacementPlugin(),  //热载入
  ]
}
if (isDev) {
  config = merge()
  config.module.rules.push({
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
  }, )
  config.devtool = 'cheap-module-eval-source-map'
  config.devServer = {
    port: '8000',
    host: '0.0.0.0',
    overlay: {
      errors: true,   //错误直接显示在网页上
    },
    hot: true
  }
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
  }
  config.module.rules.push({
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
      }
    ]
  })
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css',
    }),
  )
  config.optimization = {
    splitChunks: {
      chunks:'all',  //单独打包node_modules中的依赖
    },
    runtimeChunk: true, 
  }
}
module.exports = config