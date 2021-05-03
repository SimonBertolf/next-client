import { action } from '@storybook/addon-actions';
import { TemplateInterface } from '@/types';
import { Modal } from '@/components/app';

export default {
  title: 'app/Modal',
  component: Modal,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Modal },
  methods: {
    handleClose: action('closed'),
    handleAfterClose: action('after-close'),
    handleOk: action('handle-ok'),
  },
  template: `
    <div>
      <Modal 
        :visible="visible" 
        :title="title" 
        :onClose="handleClose" 
        :okText="okText" 
        :onOk="handleOk" 
        :afterClose="handleAfterClose"
      ></Modal>
    </div>
  `,
});

export const Example = Template.bind({});

Example.args = {
  visible: true,
  title: 'Example',
  okText: 'Ok',
  confirmLoading: false,
  isDisabled: false,
};
