const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:service-gate <serviceName>`, () => {
    it('should generate export statements for modules of a service', () => {
        const serviceName = 'IExample';
        return helpers.run(path.join(__dirname, '../index.ts'))
            .withArguments([serviceName])
            .then(function() {
                assert.fileContent(`src/services/${serviceName}/index.ts`, /export \* from '\.\/interfaces';/);
                assert.fileContent(`src/services/${serviceName}/index.ts`, /export \* from '\.\/implementations';/);
            });
    })
});
