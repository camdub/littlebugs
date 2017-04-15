const webpack = require('webpack');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log(process.env.AIRTABLE_API_KEY);

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'AIRTABLE_API_KEY': JSON.stringify(process.env.AIRTABLE_API_KEY),
      })
    );

    return config;
  },
};