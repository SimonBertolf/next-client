import { TemplateInterface } from '@/types';
import TableSorter from '@/components/app/DataTable/TableSorter.vue';

export default {
  title: 'app/TableSorter',
  component: TableSorter,
};

const methods: { [key: string]: (() => void) | unknown } = {
  handleSort(direction: string | boolean) {
    this.dir = direction;
  },
};
/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  data: () => ({ dir: false }),
  methods,
  components: { TableSorter },
  template: `
    <div class="bg-secondary">
      <TableSorter :direction="dir" @sort="(d) =>handleSort(d, 'nr')"></TableSorter>
    </div>
  `,
});

export const Example = Template.bind({});

Example.args = {};
