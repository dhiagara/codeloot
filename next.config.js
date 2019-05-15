const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack'); 
const withCSS = require('@zeit/next-css')

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

module.exports = withCSS(
withLess({
  webpack: config => {
config.plugins.push(
new MonacoWebpackPlugin({
  // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
  languages: ['json','javascript']
})
)
  return config;
    },
  lessLoaderOptions: {
    javascriptEnabled: true,
  }
})
)