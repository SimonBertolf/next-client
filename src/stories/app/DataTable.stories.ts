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
      :row-selection="{ onChange: handleChange }"
      :rowAction="rowAction"
      :hasFilter="true"
      :scroll="{ x: true, y: 304 }"
      :data="data"
    ></DataTable>
    `,
});

export const Example = Template.bind({});

Example.args = {
  rowAction: {
    options: [
      {
        key: 'example',
        label: 'Example',
      },
    ],
    onSelect: () => action('selected'),
  },
  handleChange: () => {
    action('row-selected');
  },
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
      key: '1',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '4',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '5',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '6',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '7',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '8',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '9',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '10',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
  ],
};

export const ExampleWithChildren = Template.bind({});

ExampleWithChildren.args = {
  rowAction: {
    options: [
      {
        key: 'example',
        label: 'Example',
      },
    ],
    onSelect: () => action('selected'),
  },
  handleChange: () => {
    action('row-selected');
  },
  columns: [
    {
      title: 'Age',
      key: 'age',
      children: [
        {
          type: 'sub',
          background: 'transparent',
          children: [
            {
              title: 'Total',
              background: 'transparent',
              type: 'summary',
              dataIndex: 'age',
              width: 150,
            },
          ],
        },
      ],
    },
    {
      title: 'Address',
      background: 'secondary',
      key: 'address',
      children: [
        {
          title: 'example',
          type: 'sub',
          background: 'transparent',
          children: [
            {
              title: '4342',
              background: 'transparent',
              type: 'summary',
              dataIndex: 'address',
            },
          ],
        },
      ],
    },
  ],
  data: [
    {
      key: '1',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '4',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '5',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '6',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '7',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '8',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '9',
      age: 32,
      example: 'example',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '10',
      age: 42,
      example: 'example',
      address: 'London No. 1 Lake Park',
    },
  ],
};
