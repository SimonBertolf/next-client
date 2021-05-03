import { TemplateInterface } from '@/types';
import { assetMock } from '@/../__mocks__/AssetMocks';
import store from '@/store';
import { BasicData } from '@/components/assets';

store.commit('Assets/setAsset', assetMock);

export default {
  title: 'assets/BasicData',
  component: BasicData,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  store,
  props: Object.keys(argTypes),
  components: { BasicData },
  template: '<BasicData></BasicData>',
});

export const Example = Template.bind({});

Example.args = {};
