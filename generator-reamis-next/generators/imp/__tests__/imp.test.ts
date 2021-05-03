const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:imp <className> <iName> <iNamePath`, () => {
    it('should generate a new service interface implementation', () => {
        const className = 'Example/Example';
        const iName = 'IExample';
        const iNamePath = '../../interfaces';
        return helpers.run(path.join(__dirname, '../index.ts'))
            .withArguments([className, iName, iNamePath])
            .then(function() {
                assert.file(`src/services/${iName}/implementations/${className}.ts`);
                assert.file(`src/services/${iName}/implementations/${className}/../index.ts`);
                assert.file(`src/services/${iName}/implementations/index.ts`);
            });
    })
});
