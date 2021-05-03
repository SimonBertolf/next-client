import { TemplateInterface } from '@/types';
import { Kpi } from '@/models';
import { KpiItem } from '@/components/assets';

export default {
  title: 'assets/KpiItem',
  component: KpiItem,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { KpiItem },
  template: '<KpiItem :kpi="kpi"></KpiItem>',
});

export const Example = Template.bind({});

const kpi: Kpi = {
  id: Math.random().toString(36),
  label: 'Example',
  value: 5949302,
  format: 'number',
  trend: 1,
};
Example.args = { kpi };
