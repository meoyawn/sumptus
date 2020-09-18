const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

// runtime script

const adapter = process.env.npm_config_argv?.includes("build")
  ? require("responsive-loader/sharp")
  : undefined

module.exports = withPlugins([
  [optimizedImages, {
    responsive: {
      adapter
    },
  }],

  // your other plugins here

]);
