const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:class <className> <iName> <iNamePath>`, () => {
  it('should generate typescript class with interface implementation', () => {
    const classPath = 'Example/Example';
    const iName = 'IExample';
    const iPath = '../interfaces';
    return helpers.run(path.join(__dirname, '../index.ts'))
        .withArguments([classPath, iName, iPath])
        .then(function() {
          assert.file([`${classPath}.ts`]);
        });
  })
});
