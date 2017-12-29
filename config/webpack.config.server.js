'use strict';

const webpack = require('webpack');
const paths = require('./paths');
const nodeExternals = require('webpack-node-externals');
const getClientEnvironment = require('./env');
const base = require('./webpack.config.base');
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

const config = Object.assign({}, base)

config.target = 'node'
config.entry = './src/server'
config.externals = [nodeExternals()] // in order to ignore all modules in node_modules folder
config.output = {
  path: paths.serverBuild,
  filename: 'bundle.js',
  publicPath: '/'
}

config.module.rules = config.module.rules.map(rule => {
  if (`${rule.test}`.includes('scss')) {
    const styleLoader = require.resolve('style-loader')
    const cssLoader = require.resolve('css-loader')
    rule.loader = (rule.loader || [])
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
