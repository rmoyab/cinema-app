const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'production',
  target: 'browserslist',

  // devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },

  plugins: [new CleanWebpackPlugin()],
})
