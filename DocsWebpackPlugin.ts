const TypeDocMain = require('./TypeDocMain.ts');

class DocsWebpackPlugin {
    // @ts-ignore
    apply(compiler) {
        compiler.hooks.emit.tapAsync(
            'DocsWebpackPlugin',
            // @ts-ignore
            (compilation, callback) => {
                const typeDocMain = new TypeDocMain();
                typeDocMain.main().catch(console.error);
                callback();
            }
        );
    }
}

module.exports = DocsWebpackPlugin;
