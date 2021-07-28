<template>
  <a-table
    class="w-full"
    :row-key="(record) => record._id"
    :components="itsComponents"
    :columns="filteredColumns"
    :data-source="data"
    :scroll="scroll"
    :pagination="false"
    :loading="{ indicator: spinnerComponent, spinning: loading }"
  >
    <template slot="selection" slot-scope="text, row">
      <row-selector :rowKey="row.key" @change="onSelectRow" />
    </template>
    <template slot="action" slot-scope="text, row">
      <row-action>
        <a-icon slot="title" type="more" :rotate="90" />
        <template v-for="item in rowActionOptions">
          <a-menu-item :key="item.key"
            ><span
              @click="
                () => {
                  onRowSelectAction(item.key, row);
                }
              "
              >{{ item.label }}</span
            ></a-menu-item
          >
        </template>
      </row-action>
    </template>
    <row-action slot="customFilter" :multiselect="true">
      <a-icon slot="title" type="eye" slot-scope="{ onToggle }" @click="onToggle" />
      <template v-for="col in columns">
        <a-menu-item :key="col.key">
          <a-checkbox
            :defaultChecked="true"
            class="w-full"
            @change="(event) => (col.key ? onFilter(event, col.key) : undefined)"
          >
            {{ col.title }}
          </a-checkbox>
        </a-menu-item>
      </template>
    </row-action>
  </a-table>
</template>

<script lang="ts">
// TODO: remove all any's and following comment!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import _ from 'lodash';
import { TableColumn, TableData } from '@/types';
import { VNode, VNodeData } from 'vue';
import { Spinner } from '@/components/app/Spinner';
import CustomTable from './CustomTable.vue';
import HeaderRow from './HeaderRow.vue';
import HeaderCell from './HeaderCell.vue';
import BodyRow from './BodyRow.vue';
import BodyCell from './BodyCell.vue';
import RowSelector from './RowSelector.vue';
import RowAction from './RowAction.vue';

interface TableRenderer {
  (node: unknown, props: VNodeData, c: unknown): VNode;
}
interface TableComponentRenderer {
  (h: TableRenderer, p: Record<string, unknown>, c: unknown): VNode;
}
interface TableComponents {
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

interface RowSelection {
  onChange: (selectedRows: TableData[]) => void;
}

interface RowActionType {
  options: Array<{ key: string; label: string }>;
  onSelect: (selectedKey: string, row: TableData) => void;
}

interface ScrollType {
  x: number | boolean;
  y: number;
}

@Component({ components: { RowSelector, RowAction } })
export default class DataTable extends Vue {
  @Prop({ type: Array }) columns: TableColumn[];

  @Prop({ type: Array }) data: TableData[];

  @Prop({ type: Object as () => RowSelection, default: undefined }) rowSelection: RowSelection | undefined;

  @Prop({ type: Object as () => RowActionType, default: undefined }) rowAction: RowActionType | undefined;

  @Prop({ type: Boolean, default: false }) hasFilter: boolean;

  @Prop({ type: Object as () => ScrollType, default: { x: false, y: undefined } }) scroll: ScrollType;

  @Prop({ type: Boolean, default: false }) loading: boolean;

  selectedRows: TableData[] = [];

  selectedFilterOptions: string[] = [];

  filteredColumns: TableColumn[] = this.itsColumns;

  get itsComponents(): TableComponents {
    const table: TableComponentRenderer = (h, p, c) => h(CustomTable, { ...p }, c);
    const cell: TableComponentRenderer = (h, p, c) => h(HeaderCell, { ...p }, c);
    const headerRow: TableComponentRenderer = (h, p, c) => h(HeaderRow, { ...p }, c);
    const bodyRow: TableComponentRenderer = (h, p, c) => h(BodyRow, { ...p }, c);
    const bodyCell: TableComponentRenderer = (h, p, c) => h(BodyCell, { ...p }, c);
    return { table, header: { cell, row: headerRow }, body: { row: bodyRow, cell: bodyCell } };
  }

  get spinnerComponent(): VNode {
    return this.$createElement(Spinner, { props: { spinning: true } });
  }

  get rowActionOptions(): Array<{ key: string; label: string }> {
    return this.rowAction?.options || [];
  }

  get itsColumns(): TableColumn[] {
    let columns = [...this.columns];
    const firstCol = columns.shift() as TableColumn;
    const { background = 'primary', type = 'default' } = firstCol;
    const isFirst = type === 'default' || type === 'summary';
    let itsFirstCol: TableColumn = {
      ...firstCol,
      customHeaderCell: () => ({
        props: {
          bg: background,
          type,
          isFirst,
        },
      }),
    };
    if (itsFirstCol.children) {
      itsFirstCol = {
        ...itsFirstCol,
        children: [...this.adjustFirstCol(itsFirstCol.children)],
      };
    }
    columns = [{ ...itsFirstCol }, ...columns];
    const lastCol = columns.pop() as TableColumn;
    const { background: bg = 'primary', type: colType = 'default' } = lastCol;
    const isLast = colType === 'default' || colType === 'summary';
    let itsLastCol = {
      ...lastCol,
      customHeaderCell: () => ({
        props: {
          bg,
          type: colType,
          isLast,
        },
      }),
    };
    if (itsLastCol.children) {
      itsLastCol = {
        ...itsLastCol,
        children: [...this.adjustLastCol(itsLastCol.children)],
      };
    }
    columns = [...columns, { ...itsLastCol }];
    if (this.rowSelection) {
      columns = [
        {
          title: '',
          dataIndex: 'selection',
          key: 'selection',
          width: 32,
          customCell: () => ({ props: { type: 'action' } }),
          customHeaderCell: () => ({
            props: {
              bg: 'transparent',
              type: 'action',
            },
          }),
          scopedSlots: { customRender: 'selection' },
        },
        ...columns,
      ];
    }
    let actionColumn: TableColumn = {};
    if (this.hasFilter) {
      if (this.hasChildren) {
        actionColumn = {
          ...actionColumn,
          key: 'filter',
          slots: { title: 'customFilter' },
          customHeaderCell: () => ({
            props: {
              bg: 'transparent',
              type: 'action',
            },
          }),
          children: [
            {
              dataIndex: 'action',
              width: 32,
              customHeaderCell: () => ({
                props: {
                  bg: 'transparent',
                  type: 'action',
                },
              }),
              customCell: () => ({ props: { type: 'action' } }),
            },
          ],
        };
      } else {
        actionColumn = {
          ...actionColumn,
          dataIndex: 'action',
          key: 'filter',
          width: 32,
          customHeaderCell: () => ({
            props: {
              bg: 'transparent',
              type: 'action',
            },
          }),
          customCell: () => ({ props: { type: 'action' } }),
          slots: { title: 'customFilter' },
        };
      }
    }
    if (this.rowAction) {
      if (Object.keys(actionColumn).length) {
        if (actionColumn?.children?.length) {
          const childColumn = actionColumn.children.shift();
          const itsChildColumn = {
            ...childColumn,
            scopedSlots: { customRender: 'action' },
          };
          actionColumn = {
            ...actionColumn,
            children: [itsChildColumn, ...actionColumn.children],
          };
        } else {
          actionColumn = {
            ...actionColumn,
            scopedSlots: { customRender: 'action' },
          };
        }
      } else {
        actionColumn = {
          dataIndex: 'action',
          key: 'action',
          ...actionColumn,
          width: 32,
          customHeaderCell: () => ({
            props: {
              bg: 'transparent',
              type: 'action',
            },
          }),
          customCell: () => ({ props: { type: 'action' } }),
          scopedSlots: { customRender: 'action' },
        };
      }
    }
    if (Object.keys(actionColumn).length) columns = [...columns, { ...actionColumn }];
    return columns;
  }

  get hasChildren(): boolean {
    const itsCol = this.columns.find((col) => {
      if (col.children) {
        if (col.children.length) {
          return true;
        }
      }
      return false;
    });
    if (itsCol) return true;
    return false;
  }

  mounted(): void {
    this.selectedFilterOptions = this.columns.map((col) => col.key as string);
  }

  @Emit()
  sort(dataIndex: string, dir: number): { dataIndex: string; dir: number } {
    return { dataIndex, dir };
  }

  @Watch('selectedFilterOptions', { deep: true, immediate: true })
  handleFilterChange(val: string[], oldVal: string[]): void {
    if (!_.isEqual(val, oldVal)) {
      const itsCols = [...this.itsColumns];
      const replacedColumns: TableColumn[] = [];
      const filteredColumns = itsCols.map((col, index) => {
        if (col.key && col.key !== 'action' && col.key !== 'selection' && col.key !== 'filter') {
          if (!this.selectedFilterOptions.includes(col.key)) {
            let itsCol = {
              ...col,
              width: 0,
              customHeaderCell: () => {
                if (col.customHeaderCell) {
                  const colProps = col.customHeaderCell();
                  return {
                    props: {
                      ...colProps.props,
                      hidden: true,
                    },
                  };
                }
                return { props: { hidden: true } };
              },
              customCell: () => ({ props: { hidden: true } }),
            };
            if (col.children?.length) itsCol = { ...itsCol, children: [...this.setColWidthToZero(col.children)] };
            if (col.customHeaderCell && col.customHeaderCell()?.props?.isFirst) {
              const nextCol = itsCols[index + 1];
              if (nextCol.key && this.selectedFilterOptions.includes(nextCol.key)) {
                let itsNextCol = {
                  ...nextCol,
                  customHeaderCell: () => {
                    if (nextCol.customHeaderCell) {
                      const nextColProps = nextCol.customHeaderCell();
                      return {
                        props: {
                          ...nextColProps.props,
                          isFirst: true,
                        },
                      };
                    }
                    return { props: { isFirst: true } };
                  },
                };
                if (nextCol.children?.length) {
                  itsNextCol = { ...itsNextCol, children: [...this.setColToFirst(nextCol.children)] };
                }
                replacedColumns.push(itsNextCol);
              }
            }
            if (col.customHeaderCell && col.customHeaderCell()?.props?.isLast) {
              const lastCol = itsCols[index - 1];
              if (lastCol.key && this.selectedFilterOptions.includes(lastCol.key)) {
                let itslastCol = {
                  ...lastCol,
                  customHeaderCell: () => {
                    if (lastCol.customHeaderCell) {
                      const lastColProps = lastCol.customHeaderCell();
                      return {
                        props: {
                          ...lastColProps.props,
                          isLast: true,
                        },
                      };
                    }
                    return { props: { isLast: true } };
                  },
                };
                if (lastCol.children?.length) {
                  itslastCol = { ...itslastCol, children: [...this.setColToLast(lastCol.children)] };
                }
                replacedColumns.push(itslastCol);
              }
            }
            return itsCol;
          }
        }
        return col;
      });
      const itsFilteredColumns = filteredColumns.map((col) => {
        const replacedCol = replacedColumns.find((c) => c.key === col.key);
        if (replacedCol) return replacedCol;
        return col;
      });
      this.filteredColumns = [...itsFilteredColumns];
    }
  }

  setColWidthToZero(cols: TableColumn[]): TableColumn[] {
    const itsCols: TableColumn[] = cols.map((col) => {
      let itsCol = {
        ...col,
        customHeaderCell: () => {
          if (col.customHeaderCell) {
            return {
              props: {
                ...col.customHeaderCell().props,
                hidden: true,
              },
            };
          }
          return { props: { hidden: true } };
        },
        customCell: () => ({ props: { hidden: true } }),
        width: 0,
      };
      if (col.children?.length) {
        itsCol = {
          ...itsCol,
          children: [...this.setColWidthToZero(col.children)],
        };
      }
      return itsCol;
    });
    return itsCols;
  }

  setColToFirst(cols: TableColumn[]): TableColumn[] {
    return cols.map((col) => {
      let itsCol = {
        ...col,
        customHeaderCell: () => {
          if (col.customHeaderCell) {
            const itsProps = col.customHeaderCell();
            return {
              props: {
                ...itsProps.props,
                isFirst: true,
              },
            };
          }
          return { props: { isFirst: true } };
        },
      };
      if (col.children?.length) itsCol = { ...itsCol, children: [...this.setColToFirst(col.children)] };
      return itsCol;
    });
  }

  setColToLast(cols: TableColumn[]): TableColumn[] {
    return cols.map((col) => {
      let itsCol = {
        ...col,
        customHeaderCell: () => {
          if (col.customHeaderCell) {
            const itsProps = col.customHeaderCell();
            return {
              props: {
                ...itsProps.props,
                isLast: true,
              },
            };
          }
          return { props: { isLast: true } };
        },
      };
      if (col.children?.length) itsCol = { ...itsCol, children: [...this.setColToLast(col.children)] };
      return itsCol;
    });
  }

  isFilterChecked(key: string): boolean {
    const checkedKey = this.selectedFilterOptions.find((value) => value === key);
    if (checkedKey) return true;
    return false;
  }

  adjustFirstCol(cols: TableColumn[]): TableColumn[] {
    return cols.map((col) => {
      const { background = 'primary', type = 'default' } = col;
      const isFirst = type === 'default' || type === 'summary';
      let itsCols = {
        ...col,
        customHeaderCell: () => ({
          props: {
            bg: background,
            type,
            isFirst,
          },
        }),
      };
      if (itsCols?.children) {
        itsCols = {
          ...itsCols,
          children: [...this.adjustFirstCol(itsCols.children)],
        };
      }
      return itsCols;
    });
  }

  adjustLastCol(cols: TableColumn[]): TableColumn[] {
    return cols.map((col) => {
      const { background = 'primary', type = 'default' } = col;
      const isLast = type === 'default' || type === 'summary';
      let itsCols = {
        ...col,
        customHeaderCell: () => ({
          props: {
            bg: background,
            type,
            isLast,
          },
        }),
      };
      if (itsCols?.children) {
        itsCols = {
          ...itsCols,
          children: [...this.adjustLastCol(itsCols.children)],
        };
      }
      return itsCols;
    });
  }

  onRowSelectAction(key: string, row: TableData): void {
    if (this.rowAction) this.rowAction.onSelect(key, row);
  }

  onFilter({ target }: { target: { checked: boolean } }, key: string): void {
    if (!target.checked) {
      const itsSelectedOptions = this.selectedFilterOptions.filter((value) => value !== key);
      this.selectedFilterOptions = [...itsSelectedOptions];
    } else {
      this.selectedFilterOptions = [...this.selectedFilterOptions, key];
    }
  }

  onSelectRow({ rowKey }: { checked: boolean; rowKey: string }): void {
    const row = this.selectedRows.find(({ key }) => key === rowKey);
    if (row) {
      this.selectedRows = this.selectedRows.filter(({ key }) => key !== rowKey);
    } else {
      const selectedRow = this.data.find(({ key }) => key === rowKey);
      if (selectedRow) this.selectedRows = [...this.selectedRows, selectedRow];
    }
    this.rowSelection?.onChange([...this.selectedRows]);
  }
}
</script>

<style scoped>
.body-cell-hidden {
  @apply hidden;
}
</style>
