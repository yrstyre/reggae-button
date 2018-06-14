const baseConfig = require('./webpack.config.base');
const configMerge = require('webpack-merge');

const config = {
  mode: 'production',
  devtool: 'sourcemap'
  // TODO: add config for production
};

module.exports = configMerge(baseConfig, config);
