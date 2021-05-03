import { action } from '@storybook/addon-actions';
import { TemplateInterface } from '../../types';
import { ButtonAdd } from '../../components/app';

export default {
  title: 'app/ButtonAdd',
  component: ButtonAdd,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { ButtonAdd },
  methods: { clickHandler: action('clicked') },
  template: '<ButtonAdd :onClick="clickHandler">add something</ButtonAdd>',
});

export const Example = Template.bind({});

Example.args = {};
