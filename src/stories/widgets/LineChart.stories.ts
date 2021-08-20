import { TemplateInterface } from '@/types';
import LineChart from '@/components/data-visualization/LineChart/LineChart.vue';

export default {
  title: 'widget/LineChart',
  component: LineChart,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { LineChart },
  template: `
      <line-chart 
      :chartData="chartData" 
      :chartSeries="chartSeries" 
      :chartAxes="chartAxes" 
      class="h-screen w-full" />
  `,
});

export const Example = Template.bind({});

Example.args = {
  chartData: [
    {
      x: Math.random() * 10,
      y: Math.random() * 10,
      a: Math.random() * 10,
      b: Math.random() * 10,
    },
    {
      x: Math.random() * 10,
      y: Math.random() * 10,
      a: Math.random() * 10,
      b: Math.random() * 10,
    },
    {
      x: Math.random() * 10,
      y: Math.random() * 10,
      a: Math.random() * 10,
      b: Math.random() * 10,
    },
    {
      x: Math.random() * 10,
      y: Math.random() * 10,
      a: Math.random() * 10,
      b: Math.random() * 10,
    },
    {
      x: Math.random() * 10,
      y: Math.random() * 10,
      a: Math.random() * 10,
      b: Math.random() * 10,
    },
  ],
  chartAxes: { x: { label: 'X in %', unit: '%' }, y: { label: 'Y in %' } },
  chartSeries: [
    {
      x: { key: 'x' },
      y: { key: 'y' },
      showStroke: true,
      showBullet: false,
    },
    {
      x: { key: 'a' },
      y: { key: 'b' },
      showStroke: true,
      showBullet: true,
      bulletCollor: '#00FF00',
    },
  ],
};
