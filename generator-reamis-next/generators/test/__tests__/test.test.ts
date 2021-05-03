const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:test <service> <implementation>`, () => {
    it('should generate service test', () => {
        const service = 'IExample';
        const implementation = 'Example';
        return helpers.run(path.join(__dirname, '../index.ts'))
            .withArguments([service, implementation])
            .then(function() {
                assert.file([`src/services/${service}/__tests__/${implementation}.test.ts`]);
            });
    });
});
