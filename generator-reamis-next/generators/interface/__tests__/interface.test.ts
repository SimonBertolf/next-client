const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:interface <iName>`, () => {
  it('should generate typescript interface with provided name', () => {
    const iPath = 'IExample/IExample';
    return helpers.run(path.join(__dirname, '../index.ts'))
        .withArguments([iPath])
        .then(function() {
          assert.file([`${iPath}.ts`]);
        });
  })
});
