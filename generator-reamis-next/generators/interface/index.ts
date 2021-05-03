const Generator = require('yeoman-generator');
const filenameResolver = require('../../filenameResolver');

module.exports = class extends Generator {
  // @ts-ignore
  constructor(args, opts) {
    super(args, opts);
    this.argument("iName", { type: String, required: true });
  }
  generate() {
    const interfacePath = this.options.iName;
    const interfaceName = filenameResolver.resolveFilename(interfacePath);
    this.fs.copyTpl(
        this.templatePath('index.txt'),
        this.destinationPath(`${interfacePath}.ts`),
        { iName: interfaceName }
    );
  }
};
