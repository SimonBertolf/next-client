import { VNode } from 'vue';

interface TableColumn {
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
  customRender?: Function;
}

export default TableColumn;
