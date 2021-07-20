import { TemplateInterface } from '@/types';
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
      :hasFilter="true" 
      :rowSelection="{ onChange: handleChange }" 
      :rowAction="rowAction" 
      :columns="columns" 
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
    onSelect: (...args: unknown[]) => console.log(args),
  },
  handleChange: (selectedRows: unknown) => {
    console.log(selectedRows);
  },
  columns: [
    {
      title: 'Age',
      customHeaderCell: () => ({ props: { isFirst: true } }),
      children: [
        {
          title: '',
          customHeaderCell: () => ({
            props: {
              bg: 'transparent',
              type: 'sub',
            },
          }),
          children: [
            {
              title: 'Total',
              key: 'age',
              dataIndex: 'age',
              width: 150,
              customHeaderCell: () => ({
                props: {
                  bg: 'transparent',
                  type: 'summary',
                  isFirst: true,
                },
              }),
            },
          ],
        },
      ],
    },
    {
      title: 'Address',
      customHeaderCell: () => ({
        props: {
          bg: 'secondary',
          isLast: true,
        },
      }),
      children: [
        {
          title: 'example',
          customHeaderCell: () => ({
            props: {
              bg: 'transparent',
              type: 'sub',
            },
          }),
          children: [
            {
              title: '4422',
              key: 'address',
              dataIndex: 'address',
              customHeaderCell: () => ({
                props: {
                  bg: 'transparent',
                  type: 'summary',
                  isLast: true,
                },
              }),
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
