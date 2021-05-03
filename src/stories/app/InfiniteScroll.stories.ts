import { TemplateInterface } from '@/types';
import { InfiniteScroll } from '@/components/app';

export default {
  title: 'app/InfiniteScroll',
  component: InfiniteScroll,
};

const offset = 20;

const items: string[] = [];

for (let i = 1; i <= 80; i += 1) {
  items.push(`item ${i}`);
}

const methods: { [key: string]: (() => void) | unknown } = {
  loadItems() {
    this.busy = true;
    const page = this.page as number;
    const limit = page * offset;
    const start = limit - offset;
    const collection = items.filter((...args) => args[1] >= start && args[1] < limit);
    if (collection.length) this.items = [...(this.items as string[]), ...collection];
    if (collection.length === offset) this.busy = false;
    (this.page as number) += 1;
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { InfiniteScroll },
  data: () => ({
    items: [],
    busy: false,
    page: 1,
  }),
  methods,
  template: `
    <div style="height: 300px; overflow: auto;">
      <InfiniteScroll :disabled="busy" :load="loadItems" :distance="10">
        <ul>
          <li v-for="item in items" :key="item">
            {{ item }}
          </li>
        </ul>
      </InfiniteScroll>
    </div>
  `,
});

export const Example = Template.bind({});

Example.args = {};
