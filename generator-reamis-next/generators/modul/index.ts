const Generator = require('yeoman-generator');
const filenameResolver = require('../../filenameResolver');

module.exports = class extends Generator {
  // @ts-ignore
  constructor(args, opts) {
    super(args, opts);
    this.argument("iName", { type: String, required: true });
  }
  generate() {
    const interfaceName = this.options.iName;
    this.fs.copyTpl(
        this.templatePath('index.txt'),
        this.destinationPath(`${interfaceName}/index.ts`),
    );
  }
};
