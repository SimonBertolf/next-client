// eslint-disable-next-line @typescript-eslint/no-var-requires
const DocsWebpackPlugin = require('./DocsWebpackPlugin.ts');

module.exports = {
  devServer: { proxy: 'http://localhost' },
  configureWebpack: {
    performance: { hints: false },
    plugins: [new DocsWebpackPlugin()],
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap((args) => {
        const { terserOptions } = args[0];
        // eslint-disable-next-line @typescript-eslint/camelcase
        terserOptions.keep_classnames = true;
        // eslint-disable-next-line @typescript-eslint/camelcase
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
