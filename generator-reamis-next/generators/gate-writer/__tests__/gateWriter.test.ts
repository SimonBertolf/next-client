const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:gate-writer <module>`, () => {
  it('should generate export statement for a module', () => {
    const module = 'IExample/implementations/Example';
    return helpers.run(path.join(__dirname, '../index.ts'))
        .withArguments([module])
        .then(function() {
          assert.fileContent(`${module}/../index.ts`, /export \* from '\.\/Example';/);
        });
  })
});
