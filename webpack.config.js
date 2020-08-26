
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = (env, options) => {
  const config = require(`./webpack.${options.mode}`);
  return merge(commonConfig, config);
};