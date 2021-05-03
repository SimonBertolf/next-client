const Generator = require('yeoman-generator');
const beautify = require('gulp-beautify');
const filter = require('gulp-filter');

module.exports = class extends Generator {
    // @ts-ignore
    constructor(args, opts) {
        super(args, opts);
        this.argument('serviceName', { type: String, required: true });
    }

    writing() {
        const { serviceName } = this.options;
        this.fs.copyTpl(
            this.templatePath('index.txt'),
            this.destinationPath(`src/services/${serviceName}/index.ts`),
        );
    }
};
