const webpack = require('webpack');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'AIRTABLE_API_KEY': JSON.stringify(process.env.AIRTABLE_API_KEY),
        'POSTMARK_API_KEY': JSON.stringify(process.env.POSTMARK_API_KEY)
      })
    );

    return config;
  },
};