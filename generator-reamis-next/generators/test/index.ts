const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');

module.exports = class extends Generator {
    // @ts-ignore
    constructor(args, opts) {
        super(args, opts);
        this.argument("service", { type: String, required: true });
        this.argument("implementation", { type: String, required: true });
    }
    generate() {
        const { service, implementation } = this.options;
        const instanceName =  _.camelCase(implementation);
        this.fs.copyTpl(
            this.templatePath('service.txt'),
            this.destinationPath(`src/services/${service}/__tests__/${implementation}.test.ts`),
            { instance: instanceName, iName: service }
        );
    }
};
