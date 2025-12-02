module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['@emotion/babel-plugin', 'react-native-reanimated/plugin'],
  };
};
