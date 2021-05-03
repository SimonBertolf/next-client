import { TemplateInterface } from '../../types';
import { PrimaryList } from '../../components/app';

export default {
  title: 'app/PrimaryList',
  component: PrimaryList,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { PrimaryList },
  template: '<PrimaryList :data="items" v-slot="{item, index}"><div>{{ item }}</div></PrimaryList>',
});

export const Example = Template.bind({});

Example.args = { items: ['data 1', 'data 2', 'data 3', 'data 4', 'data 5'] };
