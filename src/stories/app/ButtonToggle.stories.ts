import { TemplateInterface } from '../../types';
import { ButtonToggle } from '../../components/app';

export default {
  title: 'app/ButtonToggle',
  component: ButtonToggle,
};

const methods: { [key: string]: (() => void) | unknown } = {
  toggleBtn() {
    this.show = !this.show;
  },
};

const computed: { [key: string]: (() => void) | unknown } = {
  divCls() {
    return `transform transition-all duration-500 h-64 ease-in-out bg-primary ${this.transformCls}`;
  },
  transformCls() {
    return this.show ? 'w-64' : 'w-0';
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { ButtonToggle },
  data() {
    return { show: false };
  },
  computed,
  methods,
  template: `
    <div style="display: flex; background-color: lightgray; padding: 5px;">
      <div :class="divCls" ></div>
      <ButtonToggle :open="show" :onToggle="toggleBtn">
    </ButtonToggle></div>
  `,
});

export const Example = Template.bind({});
Example.args = {};
