import { TemplateInterface } from '@/types';
import { Tabs } from '@/components/app';

export default {
  title: 'app/Tabs',
  component: Tabs,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Tabs },
  template: `
    <div style="max-width: 300px;">
      <Tabs activeKey="1">
        <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.tab">
          content of {{tab.tab}}
        </a-tab-pane>
      </Tabs>
    </div>
  `,
});

export const Example = Template.bind({});

const tabs = Array.from({ length: 3 }, (_, i) => ({ key: i.toString(), tab: `tab ${i}` }));

Example.args = { tabs };
