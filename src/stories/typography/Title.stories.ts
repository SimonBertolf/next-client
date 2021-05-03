import { TemplateInterface } from '../../types';
import { Title } from '../../components/typography';

export default {
  title: 'typography/Title',
  component: Title,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Title },
  template: '<Title>Example</Title>',
});

export const Example = Template.bind({});

Example.args = {};
