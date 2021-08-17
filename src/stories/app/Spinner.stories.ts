import { TemplateInterface } from '@/types';
import { Spinner } from '@/components/app';

export default {
  title: 'app/Spinner',
  component: Spinner,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Spinner },
  template: `
    <div><spinner :spinning="spinning" /></div>
  `,
});

export const Example = Template.bind({});

Example.args = { spinning: true };
