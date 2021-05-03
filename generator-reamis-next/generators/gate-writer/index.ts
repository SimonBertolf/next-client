const Generator = require('yeoman-generator');
const beautify = require('gulp-beautify');
const filenameResolver = require('../../filenameResolver');

module.exports = class extends Generator {
  // @ts-ignore
  constructor(args, opts) {
    super(args, opts);
    this.argument("module", { type: String, required: true });
  }

  initializing() {
    const modulePath = this.options.module;
    this.gatePath = `${modulePath}/..`;
    this.composeWith(require.resolve('../gate/index.ts'), { arguments: [ this.gatePath ] });
  }

  writing() {
    this.registerTransformStream(beautify({ preserve_newlines: false, end_with_newline: true }));
    const gateFileContentPath = this.destinationPath(`${this.gatePath}/index.ts`);
    const moduleName = filenameResolver.resolveFilename(this.options.module);
    this.fs.append(gateFileContentPath, `export * from './${moduleName}';`);
    console.log(`added export statement for module: ${moduleName}`);
  }
};
