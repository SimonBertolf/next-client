import { TemplateInterface } from '@/types';
import { action } from '@storybook/addon-actions';
import { DataTable } from '@/components/app';

export default {
  title: 'app/DataTable',
  component: DataTable,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { DataTable },
  template: `
    <DataTable
      :columns="columns"
      :data="data"
    ></DataTable>
    `,
});

export const Example = Template.bind({});

Example.args = {
  
  columns: [
    {
      title: 'Age',
      dataIndex: 'age',
      width: 150,
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      background: 'secondary',
      key: 'address',
    },
  ],
  data: [
    {
      _id: '1',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      _id: '2',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      _id: '3',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      _id: '4',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      _id: '5',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      _id: '6',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      _id: '7',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      _id: '8',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      _id: '9',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      _id: '10',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
  ],
};