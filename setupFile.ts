import 'reflect-metadata';
import './src/ioc-mock-container';

global.Math.random = () => 1;

jest.mock('./src/components/app/Modal/Modal.vue', () => ({
  name: 'Modal',
  props: ['visible', 'onClose', 'afterClose', 'title', 'okText', 'onOk', 'confirmLoading', 'isDisabled'],
  template: `<div><slot></slot></div>`,
}));
