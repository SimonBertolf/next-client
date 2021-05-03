import l from 'lodash';
import { TemplateInterface } from '@/types';
import { FlexLayout } from '@/components/app';
import { KpiList } from '@/components/assets';

export default {
  title: 'assets/KpiList',
  component: KpiList,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { FlexLayout, KpiList },
  template: `
    <FlexLayout :gap="8" justify="between" :grow="1">
      <KpiList :kpiGroup="kpiGroup"></KpiList>
      <KpiList :kpiGroup="kpiGroup"></KpiList>
      <KpiList :kpiGroup="kpiGroup"></KpiList>
      <KpiList :kpiGroup="kpiGroup"></KpiList>
      <KpiList :kpiGroup="kpiGroup"></KpiList>
      <KpiList :kpiGroup="kpiGroup"></KpiList>
      <KpiList :kpiGroup="kpiGroup"></KpiList>
      <KpiList :kpiGroup="kpiGroup"></KpiList>
    </FlexLayout>
  `,
});

export const Example = Template.bind({});

const kpis = Array.from({ length: 12 }, (_, i) => {
  let value = 0;
  let format = '';
  if (i <= 2) {
    value = l.random(-1.0, 1.0, true);
    format = 'percent';
  }
  if (i > 2 && i <= 5) {
    value = l.random(-100, 100, true);
    format = 'number';
  }
  if (i > 5 && i <= 8) {
    value = l.random(10000, 1000000000);
    format = 'number';
  }
  if (i > 8 && i <= 11) {
    value = l.random(-10000, -10000000);
    format = 'number';
  }
  let trend = 0;
  if (value > 0) trend = 1;
  if (value < 0) trend = -1;
  return {
    label: `Keyfigure-${i}`,
    value,
    trend,
    format,
  };
});

Example.args = {
  kpiGroup: {
    category: 'Example Kpis',
    kpis,
  },
};
