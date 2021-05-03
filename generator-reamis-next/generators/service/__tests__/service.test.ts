const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:service <serviceName>`, () => {
    it('should generate a new service', () => {
        const serviceName = 'IExample';
        const componentName = serviceName.replace(/^I/, '');
        return helpers.run(path.join(__dirname, '../index.ts'))
            .withArguments([serviceName])
            .then(function() {
                assert.file(`src/services/${serviceName}/implementations/${componentName}/${componentName}.ts`);
                assert.file(`src/services/${serviceName}/implementations/${componentName}/index.ts`);
                assert.file(`src/services/${serviceName}/implementations/index.ts`);
                assert.file(`src/services/${serviceName}/__tests__/${componentName}.test.ts`);
                assert.file(`src/services/${serviceName}/interfaces/${serviceName}/${serviceName}.ts`);
                assert.file(`src/services/${serviceName}/interfaces/${serviceName}/index.ts`);
                assert.file(`src/services/${serviceName}/interfaces/index.ts`);
                assert.file(`src/services/${serviceName}/index.ts`);
                assert.file(`src/services/index.ts`);
            });
    })
});
