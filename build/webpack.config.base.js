const path = require('path')
const createVueloaderOptions = require('./vue-loader.config')
const isDev = process.env.NODE_ENV === 'development'  //这里的 process.env.NODE_ENV 是node环境的全局变量
const config = {
  mode: process.env.NODE_ENV || 'production',  //development || production
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, 'client'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',   //预处理.意思是在这几个文件的loader处理之前，都用eslint-loader处理一遍
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueloaderOptions(isDev)
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
              name: 'resources/[path][name].[hash:8].[ext]',   //输出原文件名和后缀
            }
          }
        ]
      }
    ]
  }
}
module.exports = config