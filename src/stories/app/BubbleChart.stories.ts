import { TemplateInterface } from '@/types';
import BubbleChart from '../../components/data-visualization/BubbleChart/BubbleChart.vue';

export default {
  title: 'widgets/BubbleChart',
  component: BubbleChart,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { BubbleChart },
  template: `
      <bubble-chart :chartData="chartData" :chartSeries="chartSeries" :chartAxes="chartAxes" class="h-screen w-full" />
  `,
});

export const Example = Template.bind({});

Example.args = {
  chartData: [
    {
      x: Math.random() * 10,
      y: Math.random() * 10,
      z: Math.random(),
    },
    {
      x: Math.random() * 10,
      y: Math.random() * 10,
      z: Math.random(),
    },
    {
      x: Math.random() * 10,
      y: Math.random() * 10,
      z: Math.random(),
    },
    {
      x: Math.random() * 10,
      y: Math.random() * 10,
      z: Math.random(),
    },
    {
      x: Math.random() * 10,
      y: Math.random() * 10,
      z: Math.random(),
    },
  ],
  chartAxes: { x: { label: 'X in %' }, y: { label: 'Y in %' } },
  chartSeries: [
    {
      x: { key: 'x' },
      y: { key: 'y' },
      z: { key: 'z' },
    },
  ],
};
