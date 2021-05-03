import { TemplateInterface } from '../../types';
import { Card } from '../../components/app';

export default {
  title: 'app/Card',
  component: Card,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Card },
  template: `
    <div class="bg-background" style="width: 500px; height: 500px; padding: 10px;">
      <Card>
        <template v-slot:title>{{ title }}</template>
        <template v-slot:actions><button>example</button></template>
        <div>some content</div>
      </Card>
    </div>
  `,
});

export const Example = Template.bind({});

Example.args = { title: 'Example Title' };
