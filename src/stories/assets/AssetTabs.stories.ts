import { TemplateInterface } from '@/types';
import { assetMock } from '@/../__mocks__/AssetMocks';
import store from '@/store';
import { AssetTabs } from '@/components/assets';

store.commit('Assets/setAsset', assetMock);

export default {
  title: 'assets/AssetTabs',
  component: AssetTabs,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  store,
  props: Object.keys(argTypes),
  components: { AssetTabs },
  template: '<AssetTabs></AssetTabs>',
});

export const Example = Template.bind({});

Example.args = {};
