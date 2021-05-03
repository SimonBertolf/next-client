// eslint-disable-next-line @typescript-eslint/no-var-requires
const TypeDocMain = require('./TypeDocMain.ts');

const typeDocMain = new TypeDocMain();

module.exports = {
  open: true,
  watch: true,
  nodeResolve: true,
  plugins: [
    {
      name: 'docs-builder',
      serverStart() {
        // eslint-disable-next-line no-console
        typeDocMain.main().catch(console.error);
      },
    },
  ],
  appIndex: './index.html',
  // in a monorepo you need to set set the root dir to resolve modules
  rootDir: './docs',
};
