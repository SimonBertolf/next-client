const Generator = require('yeoman-generator');
const beautify = require('gulp-beautify');
const filter = require('gulp-filter');
const filenameResolver = require('../../filenameResolver');

module.exports = class extends Generator {
    // @ts-ignore
    constructor(args, opts) {
        super(args, opts);
        this.argument("className", { type: String, required: true });
        this.argument("iName", { type: String, required: true });
        this.argument("iNamePath", { type: String, required: true});
    }

    initializing() {
        const { className, iName, iNamePath } = this.options;
        this.classModule = filenameResolver.resolveFilename(className);
        this.composeWith(require.resolve('../class/index.ts'), { arguments: [ `src/services/${iName}/implementations/${className}`, iName,  iNamePath ] });
        this.composeWith(require.resolve('../exporter/index.ts'), { arguments: [ `src/services/${iName}/implementations/${className}/..`, this.classModule ] });
    }

    writing() {
        const gulpFilter = filter('**/implementations/index.ts', { restore: true });
        this.registerTransformStream(gulpFilter);
        this.registerTransformStream(beautify({ preserve_newlines: false, end_with_newline: true }));
        this.registerTransformStream(gulpFilter.restore);
        const { iName } = this.options;
        this.composeWith(require.resolve('../gate-writer/index.ts'), { arguments: [ `src/services/${iName}/implementations/${this.classModule}` ]});
    }
};
