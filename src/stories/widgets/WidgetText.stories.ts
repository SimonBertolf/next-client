import { TemplateInterface } from '@/types';
import { WidgetText } from '@/components/data-visualization/WidgetText';

export default {
  title: 'widget/WidgetText',
  component: WidgetText,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { WidgetText },
  template: '<div><widget-text text="Text under the widget blablabal" :align="align"/></div>',
});

export const ExampleLeft = Template.bind({});
export const ExampleRight = Template.bind({});
export const ExampleCenter = Template.bind({});

ExampleLeft.args = { align: 'left' };
ExampleRight.args = { align: 'right' };
ExampleCenter.args = { align: 'center' };
