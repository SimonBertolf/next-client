import { TemplateInterface } from '../../types';
import { HighlightSmall } from '../../components/typography';

export default {
  title: 'typography/HighlightSmall',
  component: HighlightSmall,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { HighlightSmall },
  template: '<HighlightSmall>Example</HighlightSmall>',
});

export const Example = Template.bind({});

Example.args = {};
