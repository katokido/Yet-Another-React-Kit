const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveSourceWebpackPlugin = require('remove-source-webpack-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = require('../config')
const debug = require('debug')('app:webpack_config')
const devMode = config.env !== 'production'

const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__

debug('创建webpack.config配置.')

let plugins = []
let optimization = {}
if (__DEV__) {
  debug('启用实时开发插件 / Enable plugins for live development (HMR, NoErrors).')
  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
} else if (__PROD__) {
  debug('启用生产插件 / Enable plugins for production UglifyJS(压缩代码)).')
  plugins = [
    ...plugins,
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[name].css' : 'css/[name].[hash].css'
    })
  ]
  optimization = {
    ...optimization,
    runtimeChunk: false,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ],
    splitChunks: {
      chunks: 'all',
      // filename: 'js/vendor.[hash].js'
    }
  }
}

const APP_ENTRY = paths.client('index.js')

const configures = {
  mode: config.env,
  target: 'web',
  entry: {
    app: devMode ? ['webpack-hot-middleware/client', APP_ENTRY] : APP_ENTRY,
    vendor: config.vendors.vendor,
    react: config.vendors.react,
    router: config.vendors.router,
    redux: config.vendors.router
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
      // {
      //   test: /\.(js|jsx)$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: config.compiler_babel
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            //   localIdentName: '[name]__[local]__[hash:base64:5]'
            // }
          },
        ]
      },
      {
        test: /\.less$/,
        // exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            //   localIdentName: '[name]__[local]__[hash:base64:5]'
            // }
          },
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
  optimization: {
    ...optimization
  },
  devtool: devMode ? 'eval-source-map' : config.compiler_devtool,
  plugins: [
    ...plugins,
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
  ]
}

module.exports = configures
