import { TemplateInterface } from '@/types';
import { SubTitle } from '@/components/typography';

export default {
  title: 'typography/SubTitle',
  component: SubTitle,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { SubTitle },
  template: '<SubTitle></SubTitle>',
});

export const Example = Template.bind({});

Example.args = {};
