const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:modul <iName>`, () => {
  it('should generate a directory with a empty index.ts file', () => {
    const iName = 'IExample';
    return helpers.run(path.join(__dirname, '../index.ts'))
        .withArguments([iName])
        .then(function() {
          assert.file([`${iName}/index.ts`]);
        });
  })
});
