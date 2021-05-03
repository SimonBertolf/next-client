import { DescriptionType, ColumnType, TemplateInterface } from '@/types';
import { Descriptions } from '../../components/app';

export default {
  title: 'app/Descriptions',
  component: Descriptions,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Descriptions },
  template: '<Descriptions :descriptions="descriptions()" :column="column()" />',
});

export const Example = Template.bind({});

Example.args = {
  descriptions: (): Array<DescriptionType> => [
    {
      label: 'label 1',
      value: 'value 1',
    },
    {
      label: 'label 2',
      value: 'value 2',
    },
    {
      label: 'label 2',
      value: 'value 2',
    },
  ],
  column: (): ColumnType => ({ xs: 1, sm: 3, md: 3 }),
};
