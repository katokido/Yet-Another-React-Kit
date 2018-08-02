/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')
const debug = require('debug')('app:config-index')
// const argv = require('yargs').argv
const ip = require('ip')

debug('创建默认配置')
debug('IP：', ip.address())
debug('PORT：', process.env.PORT || 3053)
debug('HOST：', process.env.npm_config_host || '非compile')

// ========================================================
// global Configuration
// 由于虚拟接口不能很优雅的require到models
// 全局配置
// ========================================================
global.ROOT_PATH = path.resolve(__dirname, '..')

// ========================================================
// Default Configuration
// 默认配置
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // 项目结构
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_server: 'server',
  dir_test: 'tests',

  // ----------------------------------
  // Server Configuration
  // 服务器配置
  // ----------------------------------
  // package.json 读取config对象里的配置
  // const PORT = process.env.npm_package_config_port
  // ----------------------------------
  server_host: ip.address(), // ip.address() use string 'localhost' to prevent exposure on local network
  server_port: process.env.PORT || 3053,

  // ----------------------------------
  // Compiler Configuration
  // 编译器配置
  // ----------------------------------
  compiler_babel: {
    cacheDirectory: true,
    plugins: [
      ['react-hot-loader/babel'],
      ['transform-decorators-legacy'],
      ['syntax-dynamic-import'],
      ['transform-runtime'],
      [
        'import',
        {
          libraryName: 'antd',
          'libraryDirectory': 'es',
          style: true
        }
      ]
    ],
    presets: [
      [
        'env',
        {
          debug: true,
          targets: {
            browsers: ['last 2 versions', 'safari >= 7']
          }
        }
      ],
      ['react'],
      ['stage-0']
    ]
  },
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_api: '/api',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  vendors: {
    react: [
      'react',
      'prop-types'
    ],
    router: [
      'react-router-dom',
      'history'
    ],
    redux: [
      'redux',
      'react-redux'
    ],
    vendor: [
      'lodash',
      'axios'
    ]
  },
  compiler_vendors: [
    'history',
    'lodash',
    'antd',
    'axios',
    'prop-types',
    'react',
    'react-redux',
    'react-router-dom',
    'redux'
  ]
}

// ------------------------------------
// Environment
// 环境
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc & must to json
config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env)
  },
  NODE_ENV: config.env,
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __IP__: config.env === 'production',
  __HOST__: JSON.stringify(process.env.npm_config_host) || null,
  __TEST__: config.env === 'test'
}

// ------------------------------------
// Utilities
// 实用程序
// path.resolve 它可以接受多个参数，依次表示所要进入的路径，直到将最后一个参数转为绝对路径。
// 如果根据参数无法得到绝对路径，就以当前所在路径作为基准。除了根目录，该方法的返回值都不带尾部的斜杠。
// ------------------------------------
function base() {
  const args = [config.path_base].concat([].slice.call(arguments))
  // debug(args);
  // debug(path.resolve.apply(path, args));
  return path.resolve.apply(path, args)
}

config.utils_paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  dist: base.bind(null, config.dir_dist)
}

module.exports = config
