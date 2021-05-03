const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const filenameResolver = require('../../../filenameResolver');

describe(`reamis-next:cmp <component>`, () => {
    it('should generate a vue component with story', () => {
        const component = 'navigation/Drawer';
        const cmpName = filenameResolver.resolveFilename(component);
        const [ module ] = component.split('/');
        return helpers.run(path.join(__dirname, '../index.ts'))
            .withArguments([component])
            .then(function() {
                assert.file([`src/components/${component}/${cmpName}.vue`]);
                assert.file([`src/components/${component}/index.ts`]);
                assert.file([`src/components/${module}/index.ts`]);
                assert.file([`src/stories/${component}.stories.ts`]);
            });
    })
});
