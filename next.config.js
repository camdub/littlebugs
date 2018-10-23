const webpack = require('webpack');

module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      const { parsed: localEnv } = require('dotenv').config();
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

      return config;
    }
    return config;
  },
};
