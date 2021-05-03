import { action } from '@storybook/addon-actions';
import { TemplateInterface } from '@/types';
import { ButtonSave } from '@/components/app';

export default {
  title: 'app/ButtonSave',
  component: ButtonSave,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { ButtonSave },
  methods: { clickHandler: action('clicked') },
  template: `
    <form @submit.prevent="clickHandler">
      <ButtonSave></ButtonSave>
    </form> 
  `,
});

export const Example = Template.bind({});

Example.args = {};
