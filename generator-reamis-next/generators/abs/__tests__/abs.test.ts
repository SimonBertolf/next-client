const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:abs <serviceName> <iName>`, () => {
  it('should generate a new service interface', () => {
    const serviceName = 'IExample';
    const iName = 'IExample';
    return helpers.run(path.join(__dirname, '../index.ts'))
        .withArguments([serviceName, iName])
        .then(function() {
            assert.file(`src/services/${serviceName}/interfaces/${iName}/${iName}.ts`);
            assert.file(`src/services/${serviceName}/interfaces/${iName}/index.ts`);
            assert.file(`src/services/${serviceName}/interfaces/index.ts`);
        });
  })
});
