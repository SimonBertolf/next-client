const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:component <componentName>`, () => {
  it('should generate Vue component', () => {
    const componentName = 'components/Example';
    return helpers.run(path.join(__dirname, '../index.ts'))
        .withArguments([componentName])
        .then(function() {
          assert.file([`${componentName}.vue`]);
        });
  })
});
