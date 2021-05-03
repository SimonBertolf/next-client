const Generator = require('yeoman-generator');
const path = require('path');
const filenameResolver = require('../../filenameResolver');

module.exports = class extends Generator {
  // @ts-ignore
  constructor(args, opts) {
    super(args, opts);
    this.argument("className", { type: String, required: true });
    this.argument("iName", { type: String, required: true });
    this.argument("iNamePath", { type: String, required: true});
  }
  generate() {
    const classPath = this.options.className;
    const className = filenameResolver.resolveFilename(classPath);
    this.fs.copyTpl(
        this.templatePath('index.txt'),
        this.destinationPath(`${classPath}.ts`),
        { className, iName: this.options.iName, interfacePath: this.options.iNamePath }
    );
  }
};
