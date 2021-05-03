const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:exporter <destination> <module>`, () => {
  it('should generate index.ts that exports a module', () => {
    const destination = 'IExample/interfaces/IExample';
    const module = './IExample';
    return helpers.run(path.join(__dirname, '../index.ts'))
        .withArguments([destination,module])
        .then(function() {
          assert.file([`${destination}/index.ts`]);
        });
  })
});
