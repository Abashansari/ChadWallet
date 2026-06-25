require('@babel/register')({
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  presets: ['babel-preset-expo'],
});

try {
  const store = require('./src/store/authStore');
  console.log('Store loaded successfully:', !!store.useAuthStore);
} catch (e) {
  console.error('Error loading store:', e);
}
