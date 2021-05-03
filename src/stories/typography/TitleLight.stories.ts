import { TemplateInterface } from '@/types';
import { TitleLight } from '@/components/typography';

export default {
  title: 'typography/TitleLight',
  component: TitleLight,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { TitleLight },
  template: '<TitleLight>{{ title }}</TitleLight>',
});

export const Example = Template.bind({});

Example.args = { title: 'Example Title' };
