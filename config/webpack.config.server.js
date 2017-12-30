'use strict';

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const paths = require('./paths');
const nodeExternals = require('webpack-node-externals');
const getClientEnvironment = require('./env');
const base = require('./webpack.config.base');
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);
const PROD = process.env.NODE_ENV === 'production'

const config = Object.assign({}, base)

config.target = 'node'
config.entry = './src/server'
config.externals = [nodeExternals()] // in order to ignore all modules in node_modules folder
config.output = {
  path: paths.serverBuild,
  filename: 'bundle.js',
  publicPath: '/'
}

if (PROD) {
  config.module.rules = config.module.rules.concat([
    {
      test: /\.scss$/,
      loader: [
        {
          loader: require.resolve('css-loader/locals'),
          options: {
            camelCase: true,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            sourceMap: !PROD,
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
        {
          loader: require.resolve('sass-loader'),
          options: {
            sourceMap: !PROD
          },
        },
      ],
    },
  ])
} else {
  config.module.rules = config.module.rules.map(rule => {
    if (`${rule.test}`.includes('scss')) {
      const styleLoader = require.resolve('style-loader')
      const cssLoader = require.resolve('css-loader')
      rule.use = (rule.use || [])
        .filter(loader => loader.loader !== styleLoader) // style loader not used on server
        .map((loader = {}) => {
          if (loader.loader === cssLoader) {
            loader.loader = require.resolve('css-loader/locals') // css modules requires locals loader on server
          }
          return loader
        })
    }
    return rule
  })
}

config.plugins = config.plugins.concat([
  // Makes some environment variables available to the JS code, for example:
  // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
  new webpack.DefinePlugin(env.stringified),
])

config.node = {
  console: false,
  global: false,
  process: false,
  Buffer: false,
  __filename: false,
  __dirname: false,
  setImmediate: false,
}

module.exports = config
