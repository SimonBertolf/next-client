import { TemplateInterface } from '@/types';
import { kpiGroupList } from '@/../__mocks__/KpiGroupListMocks';
import { KpiListMobile } from '@/components/assets';

export default {
  title: 'assets/KpiListMobile',
  component: KpiListMobile,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { KpiListMobile },
  template: '<KpiListMobile :kpiGroup="kpiGroup"></KpiListMobile>',
});

export const Example = Template.bind({});

Example.args = { kpiGroup: kpiGroupList[0] };
