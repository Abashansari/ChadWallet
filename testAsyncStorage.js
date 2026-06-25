require('@babel/register')({
  presets: ['babel-preset-expo'],
});
const AsyncStorage = require('@react-native-async-storage/async-storage').default;
console.log('AsyncStorage default export:', AsyncStorage);
console.log('AsyncStorage keys:', Object.keys(AsyncStorage || {}));
