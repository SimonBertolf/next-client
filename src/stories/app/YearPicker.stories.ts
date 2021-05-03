import { TemplateInterface } from '@/types';
import { YearPicker } from '@/components/app';

export default {
  title: 'app/YearPicker',
  component: YearPicker,
};

const methods: { [key: string]: (() => void) | unknown } = {
  handleChange(year: number) {
    this.selectedYear = year;
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  data: () => ({ selectedYear: new Date(Date.now()).getFullYear() }),
  methods,
  components: { YearPicker },
  template: '<YearPicker :onChange="handleChange" :year="selectedYear"></YearPicker>',
});

export const Example = Template.bind({});

Example.args = {};
