const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const RemoveSourceWebpackPlugin = require('remove-source-webpack-plugin')

const config = require('../config')

const paths = config.utils_paths
const APP_ENTRY = paths.client('index.js')

module.exports = {
  mode: config.env,
  target: 'web',
  context: path.join(__dirname, 'js'),
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      APP_ENTRY
    ],
    vendor: config.compiler_vendors
  },
  output: {
    path: paths.dist(),
    filename: `[name].[${config.compiler_hash_type}].js`,
    chunkFilename: '[name].[chunkhash].js',
    publicPath: config.compiler_public_path
  },
  resolve: {
    modules: [
      paths.client(),
      'node_modules'
    ],
    enforceExtension: false,
    extensions: ['.js', '.jsx', '.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: config.compiler_babel
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[hash:16].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[hash:16].[ext]'
            }
          }
        ]
      }
    ]
  },
  devtool: config.compiler_devtool,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(config.globals),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: paths.client('index.html'),
      inlineSource: 'manifest.[a-z0-9]{8}.js$',
      hash: false,
      favicon: paths.client('static/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        // caseSensitive: false, //是否大小写敏感
        collapseBooleanAttributes: true, // 是否简写boolean格式的属性如：disabled="disabled" 简写为disabled
        collapseWhitespace: true // 是否去除空格
      }
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new RemoveSourceWebpackPlugin('manifest.[a-z0-9]{8}.js$')
  ],
}
