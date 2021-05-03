import StoryRouter from 'storybook-vue-router';
import { TemplateInterface } from '../../types';
import { Layout } from '../../components/app';

export default {
  title: 'app/Layout',
  component: Layout,
  decorators: [StoryRouter()],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Layout },
  template: '<Layout><template v-slot:header>my header</template>my content</Layout>',
});

export const Example = Template.bind({});
Example.args = {};
