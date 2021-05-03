import { TemplateInterface } from '@/types';
import { Fade } from '@/components/motion';

export default {
  title: 'motion/Fade',
  component: Fade,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  data() {
    return { show: true };
  },
  components: { Fade },
  template:
    '<div><button @click="show = !show">fade</button><Fade><p v-if="show" :key="12313">Example</p></Fade></div>',
});

export const Example = Template.bind({});

Example.args = {};
