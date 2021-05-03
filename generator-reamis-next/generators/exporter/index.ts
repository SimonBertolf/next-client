const Generator = require('yeoman-generator');
const filenameResolver = require('../../filenameResolver');

module.exports = class extends Generator {
  // @ts-ignore
  constructor(args, opts) {
    super(args, opts);
    this.argument("destination", { type: String, required: true });
    this.argument("module", { type: String, required: true });
  }
  generate() {
    const modulePath = this.options.module;
    const moduleName = filenameResolver.resolveFilename(modulePath);
    const filename = moduleName.replace('.vue', '');
    this.fs.copyTpl(
        this.templatePath('index.txt'),
        this.destinationPath(`${this.options.destination}/index.ts`),
        { filename, filePath: modulePath }
    );
  }
};
