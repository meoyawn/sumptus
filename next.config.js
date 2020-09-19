const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

// runtime script

const building = ["build", "dev"]

const adapter = building.some(x => process.env.npm_config_argv.includes(x))
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
