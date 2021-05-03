const Generator = require('yeoman-generator');
const beautify = require('gulp-beautify');
const filter = require('gulp-filter');

module.exports = class extends Generator {
    // @ts-ignore
    constructor(args, opts) {
        super(args, opts);
        this.argument("component", { type: String, required: true });
    }

    writing() {
        const { component } = this.options;
        const [ module , cmp ] = component.split('/');
        const gulpFilter = filter([`**/components/${module}/index.ts`], { restore: true });
        this.registerTransformStream(gulpFilter);
        this.registerTransformStream(beautify({ preserve_newlines: false, end_with_newline: true }));
        this.registerTransformStream(gulpFilter.restore);
        this.composeWith(require.resolve('../component/index.ts'), { arguments: [ `src/components/${component}/${cmp}` ] });
        this.composeWith(require.resolve('../exporter/index.ts'), { arguments: [ `src/components/${component}`, `${cmp}.vue` ] });
        this.composeWith(require.resolve('../gate-writer/index.ts'), { arguments: [ `src/components/${component}` ] });
        this.composeWith(require.resolve('../story/index.ts'), { arguments: [ component ] });
    }
};
