const path = require('path')
const ReactRefresh = require('@pmmmwh/react-refresh-webpack-plugin')
const { merge } = require('webpack-merge')
const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'development',
  target: 'web',

  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: './dist',
    },
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      context: ['/api'],
      target: 'http://localhost:3001',
    },
    // open: true,
    // writeToDisk: true,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },

  plugins: [new ReactRefresh({ overlay: false })],
})
