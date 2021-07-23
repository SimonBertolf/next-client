/* eslint-disable import/extensions */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const DocsWebpackPlugin = require('./DocsWebpackPlugin.ts');

module.exports = {
  devServer: { proxy: 'http://localhost', disableHostCheck: true },
  configureWebpack: {
    performance: { hints: false },
    plugins: [new DocsWebpackPlugin()],
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap((args) => {
        const { terserOptions } = args[0];
        terserOptions.keep_classnames = true;
        terserOptions.keep_fnames = true;
        return args;
      });
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'de',
      fallbackLocale: 'de',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
