import { VNode } from 'vue';

export interface TableColumn {
  title?: string | VNode;
  dataIndex?: string;
  key: string;
  width?: number | string;
  fixed?: string;
  className?: string;
  align?: string;
  slots?: {
    [key: string]: string;
  };
  scopedSlots?: { customRender: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customRender?: (text: string, record: any, index: number) => VNode;
}
