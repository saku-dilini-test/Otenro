module.exports = {
  staticFileGlobs: [
    './src/**.html',
    './src/**.js',
    './src/**.css',
    './src/*',
    './src/app/*',
    './src/app/header/*',
    './src/assets/images/*',
    './src/assets/css/*',
    './src/assets/js/*',
    './src/assets/icons/*'
  ],
  // runtimeCaching: [{
  // urlPattern: /testhellomobile\.firebaseapp\.com/,
  // handler: 'networkFirst'
  // }],
  root: './src',
  stripPrefix: './src/',
  navigateFallback: './src/index.html'
};
