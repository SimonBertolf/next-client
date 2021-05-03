import { TemplateInterface } from '@/types';
import store from '@/store';
import { assetMock } from '@/../__mocks__/AssetMocks';
import { KpiListContainer } from '@/components/assets';

store.commit('Assets/setAsset', assetMock);

export default {
  title: 'assets/KpiListContainer',
  component: KpiListContainer,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  store,
  props: Object.keys(argTypes),
  components: { KpiListContainer },
  template: '<KpiListContainer></KpiListContainer>',
});

export const Example = Template.bind({});

Example.args = {};
