import { TemplateInterface } from '@/types';
import { WidgetTitle } from '@/components/data-visualization/WidgetTitle';

export default {
  title: 'widget/WidgetTitle',
  component: WidgetTitle,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { WidgetTitle },
  template: '<div><widget-title title="Title of Widgets" :align="align"/></div>',
});

export const ExampleLeft = Template.bind({});
export const ExampleRight = Template.bind({});
export const ExampleCenter = Template.bind({});

ExampleLeft.args = { align: 'left' };
ExampleRight.args = { align: 'right' };
ExampleCenter.args = { align: 'center' };
