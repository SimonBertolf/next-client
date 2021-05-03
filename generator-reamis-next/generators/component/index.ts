const Generator = require('yeoman-generator');
const filenameResolver = require('../../filenameResolver');

module.exports = class extends Generator {
  // @ts-ignore
  constructor(args, opts) {
    super(args, opts);
    this.argument("componentName", { type: String, required: true });
  }
  generate() {
    const componentPath = this.options.componentName;
    const component = filenameResolver.resolveFilename(componentPath);
    this.fs.copyTpl(
        this.templatePath('index.txt'),
        this.destinationPath(`${componentPath}.vue`),
        { cmpName: component }
    );
  }
};
