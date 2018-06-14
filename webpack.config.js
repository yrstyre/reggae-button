const developmentConfig = require('./webpack.config.development');
const productionConfig = require('./webpack.config.production');

let config = developmentConfig;
if (process.env.NODE_ENV === 'production') {
  config = productionConfig;
}

module.exports = config;
