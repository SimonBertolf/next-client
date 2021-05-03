const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe(`reamis-next:story <component>`, () => {
    it('should generate a new story', () => {
        const component = 'navigation/Drawer';
        return helpers.run(path.join(__dirname, '../index.ts'))
            .withArguments([component])
            .then(function() {
                assert.file(`src/stories/${component}.stories.ts`);
            });
    })
});
