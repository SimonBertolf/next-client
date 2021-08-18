import type { VNode, VNodeData } from 'vue';

export interface TableRenderer {
  (node: unknown, props: VNodeData, c: unknown): VNode;
}

export interface TableComponentRenderer {
  (h: TableRenderer, p: Record<string, unknown>, c: unknown): VNode;
}

export interface TableComponents {
  table?: TableComponentRenderer;
  header?: {
    cell?: TableComponentRenderer;
    row?: TableComponentRenderer;
    wrapper?: TableComponentRenderer;
  };
  body?: {
    cell?: TableComponentRenderer;
    row?: TableComponentRenderer;
    wrapper?: TableComponentRenderer;
  };
}

export enum TableColumnTypes {
  DEFAULT = 'default',
  SUMMARY = 'summary',
  UNIT = 'unit',
}

export interface TableColumn {
  title?: string | VNode;
  dataIndex?: string;
  key?: string;
  width?: number | string;
  fixed?: string;
  className?: string;
  align?: string;
  slots?: {
    [key: string]: string;
  };
  children?: TableColumn[];
  scopedSlots?: { customRender: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customRender?: (text: string, record: any, index: number) => VNode;
  customHeaderCell?: () => VNodeData;
  customCell?: (record: unknown, rowIndex: number) => VNodeData;
  background?: string;
  type?: string;
  sorter?: boolean;
  optional?: boolean;
  direction?: boolean | string;
  editable?: boolean;
}

export interface TableData {
  key: string;
  [key: string]: string | number;
}
