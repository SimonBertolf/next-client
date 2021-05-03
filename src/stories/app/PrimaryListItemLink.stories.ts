import StoryRouter from 'storybook-vue-router';
import { DescriptionType, ColumnType, TemplateInterface } from '@/types';
import { PrimaryListItemLink } from '../../components/app';

export default {
  title: 'app/PrimaryListItemLink',
  component: PrimaryListItemLink,
  argTypes: { onClick: { action: 'clicked' } },
  /* eslint-disable @typescript-eslint/no-empty-function */
  args: { ...(process.env.NODE_ENV === 'test' ? { onClick: () => {} } : {}) },
  decorators: [StoryRouter()],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { PrimaryListItemLink },
  template: '<PrimaryListItemLink :to="to" :descriptions="descriptions()" :column="column()" :onEdit="onClick" />',
});

export const Example = Template.bind({});

Example.args = {
  to: '/',
  descriptions: (): Array<DescriptionType> => [
    {
      label: 'label 1',
      value: 'value 1',
    },
    {
      label: 'label 2',
      value: 'value 2',
    },
  ],
  column: (): ColumnType => ({ xs: 1, sm: 2, md: 2 }),
};
