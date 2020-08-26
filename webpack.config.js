
const { merge } = require('webpack-merge');
const commonConfig = require('./config/webpack.common');

module.exports = (env, options) => {
  const config = require(`./config/webpack.${options.mode}`);
  return merge(commonConfig, config);
};