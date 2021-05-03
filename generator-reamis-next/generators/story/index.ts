const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // @ts-ignore
    constructor(args, opts) {
        super(args, opts);
        this.argument("component", { type: String, required: true });
    }

    writing() {
        const { component } = this.options;
        const [ module, cmp ] = component.split('/');
        this.fs.copyTpl(
            this.templatePath('index.txt'),
            this.destinationPath(`src/stories/${component}.stories.ts`),
            { cmp, module }
        );
    }

};
