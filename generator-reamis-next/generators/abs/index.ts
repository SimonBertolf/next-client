const Generator = require('yeoman-generator');
const beautify = require('gulp-beautify');
const filter = require('gulp-filter');

module.exports = class extends Generator {
  // @ts-ignore
  constructor(args, opts) {
    super(args, opts);
    this.argument('serviceName', { type: String, required: true });
    this.argument("iName", { type: String, required: true });
  }

  initializing() {
    const { serviceName, iName } = this.options;
    this.composeWith(require.resolve('../interface/index.ts'), { arguments: [ `src/services/${serviceName}/interfaces/${iName}/${iName}` ] });
    this.composeWith(require.resolve('../exporter/index.ts'), { arguments: [ `src/services/${serviceName}/interfaces/${iName}`, iName ] });
  }

  writing() {
    const gulpFilter = filter('**/interfaces/index.ts', { restore: true });
    this.registerTransformStream(gulpFilter);
    this.registerTransformStream(beautify({ preserve_newlines: false, end_with_newline: true }));
    this.registerTransformStream(gulpFilter.restore);
    const { serviceName, iName } = this.options;
    this.composeWith(require.resolve('../gate-writer/index.ts'), { arguments: [ `src/services/${serviceName}/interfaces/${iName}` ]});
  }
};
