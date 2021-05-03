import { TemplateInterface } from '../../types';
import { Overlay } from '../../components/app';

export default {
  title: 'app/Overlay',
  component: Overlay,
};

const methods: { [key: string]: (() => void) | unknown } = {
  onOverlayClose() {
    this.showtime = !this.showtime;
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface & { components?: unknown } = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Overlay },
  data() {
    return { showtime: true };
  },
  methods,
  template: `
    <div style="width: 100%; height: 100%; position: relative;">
      <div style="border: black solid 1px; position: relative;">
        <Overlay :show="showtime" :absolute="absolute" :onClose="onOverlayClose"></Overlay>
        <div style="position: relative;">hey bro</div>
      </div>
    </div>
  `,
});

export const Absolute = Template.bind({});

Absolute.args = { absolute: true };

export const FullScreen = Template.bind({});

FullScreen.args = { absolute: false };
