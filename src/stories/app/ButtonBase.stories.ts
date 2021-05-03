import { action } from '@storybook/addon-actions';
import { TemplateInterface } from '@/types';
import { ButtonBase } from '@/components/app';

export default {
  title: 'app/ButtonBase',
  component: ButtonBase,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { ButtonBase },
  methods: { clickHandler: action('clicked') },
  template: '<ButtonBase :onClick="clickHandler" :primary="primary">Example</ButtonBase>',
});

export const Example = Template.bind({});

Example.args = { primary: true };
