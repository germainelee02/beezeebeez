// something that i copy pasted from stackOF because this file is needed for firebase dependencies... but the expo CLI doesn't prepare this file for you or something...

const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;