const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:gate <destination>`, () => {
  it('should generate empty index.ts file', () => {
    const destination = 'IExample';
    return helpers.run(path.join(__dirname, '../index.ts'))
        .withArguments([destination])
        .then(function() {
          assert.file([`${destination}/index.ts`]);
        });
  })
});
