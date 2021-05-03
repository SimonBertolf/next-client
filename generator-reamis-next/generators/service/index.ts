const Generator = require('yeoman-generator');
const filenameResolver = require('../../filenameResolver');
const beautify = require('gulp-beautify');
const filter = require('gulp-filter');

module.exports = class extends Generator {
  // @ts-ignore
  constructor(args, opts) {
    super(args, opts);
    this.argument("serviceName", { type: String, required: true });
  }

  writing() {
    const { serviceName } = this.options;
    const interfaceName = filenameResolver.resolveFilename(serviceName);
    const componentName = interfaceName.replace(/^I/, '');
    const gulpFilter = filter(['**/interfaces/index.ts', '**/implementations/index.ts', `**/services/index.ts`], { restore: true });
    this.registerTransformStream(gulpFilter);
    this.registerTransformStream(beautify({ preserve_newlines: false, end_with_newline: true }));
    this.registerTransformStream(gulpFilter.restore);
    this.composeWith(require.resolve('../abs/index.ts'), { arguments: [ serviceName, interfaceName ] });
    this.composeWith(require.resolve('../imp/index.ts'), { arguments: [ `${componentName}/${componentName}`, interfaceName, '../../interfaces' ] });
    this.composeWith(require.resolve('../test/index.ts'), { arguments: [ serviceName, componentName ] });
    this.composeWith(require.resolve('../service-gate/index.ts'), { arguments: [ serviceName ] });
    this.composeWith(require.resolve('../gate-writer/index.ts'), { arguments: [ `src/services/${serviceName}` ] });
  }

};
