interface TableColumn {
  title?: string;
  dataIndex: string;
  key: string;
  width?: number;
  fixed?: string;
  className?: string;
  align?: string;
  slots?: {
    [key: string]: string;
  };
  scopedSlots?: { customRender: string };
}

export default TableColumn;
