const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const FileStore = require("metro-cache").FileStore;
const path = require("path");

const config = getDefaultConfig(__dirname);

// Override cache folder to project directory to bypass MacOS /var/folders EPERM locks
config.cacheStores = [
  new FileStore({
    root: path.join(__dirname, ".metro-cache"),
  }),
];

module.exports = withNativeWind(config, { input: "./global.css" });
