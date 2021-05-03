import { TemplateInterface } from '@/types';
import { Select } from '@/components/data-entry';

export default {
  title: 'data-entry/Select',
  component: Select,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Select },
  data: () => ({ itsValue: undefined }),
  template: `
    <div style="height: 500px;" class=" w-full p-2 flex flex-col justify-center items-center">
      <Select :placeholder="placeholder" :options="options" v-model="itsValue"></Select>
      <p>{{itsValue}}</p>
    </div>
  `,
});

export const Example = Template.bind({});

const options = Array.from({ length: 5 }, (_, i) => ({ label: `label ${i}`, value: i.toString() }));

Example.args = {
  placeholder: 'example select',
  options,
};
