const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const dirSrc = path.join(__dirname, 'src/client')
const dirApp = path.join(dirSrc, 'app')
const dirAssets = path.join(dirSrc, 'assets')
const dirStyles = path.join(dirSrc, 'sass')
const dirNode = 'node_modules'

module.exports = {
  entry: [path.join(dirSrc, 'index.js'), path.join(dirStyles, 'styles.scss')],

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [dirApp, dirAssets, dirNode],
  },

  output: {
    filename: 'main.js',
    chunkFilename: '[id].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name]_[hash:6][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico',
      // inject: 'body',
      // minify: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './public',
          to: '',
          globOptions: {
            ignore: ['**/*.html', '**/*.ico'],
          },
        },
      ],
    }),
    new Dotenv(),
  ],
}
