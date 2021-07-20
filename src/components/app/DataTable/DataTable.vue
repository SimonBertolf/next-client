<template>
  <a-table
    :components="itsComponents"
    :columns="itsColumns"
    :data-source="data"
    :pagination="false"
    :scroll="{ x: true, y: 304 }"
  >
    <template slot="selection" slot-scope="text, row">
      <row-selector :rowKey="row.key" @change="onSelectRow" />
    </template>
    <template slot="action" slot-scope="text, row">
      <row-action>
        <a-icon slot="title" type="more" :rotate="90" />
        <template v-for="item in rowActionOptions">
          <a-menu-item :key="item.key"
            ><span @click="() => onRowSelectAction(item.key, row)">{{ item.label }}</span></a-menu-item
          >
        </template>
      </row-action>
    </template>
    <row-action slot="customFilter">
      <a-icon slot="title" type="eye" />
      <template v-for="item in rowActionOptions">
        <a-menu-item :key="item.key"
          ><span>{{ item.label }}</span></a-menu-item
        >
      </template>
    </row-action>
  </a-table>
</template>

<script lang="ts">
// TODO: remove all any's and following comment!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TableColumn, TableData } from '@/types';
import { VNode, VNodeChildren, VNodeData } from 'vue';
import CustomTable from './CustomTable.vue';
import HeaderRow from './HeaderRow.vue';
import HeaderCell from './HeaderCell.vue';
import BodyRow from './BodyRow.vue';
import BodyCell from './BodyCell.vue';
import RowSelector from './RowSelector.vue';
import RowAction from './RowAction.vue';

interface RowSelection {
  onChange: (selectedRows: TableData[]) => void;
}

interface RowActionType {
  options: Array<{ key: string; label: string }>;
  onSelect: (selectedKey: string, row: TableData) => void;
}

@Component({ components: { RowSelector, RowAction } })
export default class DataTable extends Vue {
  @Prop({ type: Array }) columns: TableColumn[];

  @Prop({ type: Array }) data: TableData[];

  @Prop({ type: Object as () => RowSelection, default: undefined }) rowSelection: RowSelection | undefined;

  @Prop({ type: Object as () => RowActionType, default: undefined }) rowAction: RowActionType | undefined;

  @Prop({ type: Boolean, default: false }) hasFilter: boolean;

  selectedRows: TableData[] = [];

  get itsComponents() {
    const table = (h: (node: unknown, props: VNodeData, c: unknown) => VNode, p: Record<string, unknown>, c: unknown) =>
      h(CustomTable, { ...p }, c);
    const cell = (h: (node: unknown, props: VNodeData, c: unknown) => VNode, p: Record<string, unknown>, c: unknown) =>
      h(HeaderCell, { ...p }, c);
    const headerRow = (
      h: (node: unknown, props: VNodeData, c: unknown) => VNode,
      p: Record<string, unknown>,
      c: unknown,
    ) => h(HeaderRow, { ...p }, c);
    const bodyRow = (
      h: (node: unknown, props: VNodeData, c: unknown) => VNode,
      p: Record<string, unknown>,
      c: unknown,
    ) => h(BodyRow, { ...p }, c);
    const bodyCell = (
      h: (node: unknown, props: VNodeData, c: unknown) => VNode,
      p: Record<string, unknown>,
      c: unknown,
    ) => h(BodyCell, { ...p }, c);
    return { table, header: { cell, row: headerRow }, body: { row: bodyRow, cell: bodyCell } };
  }

  get rowActionOptions(): Array<{ key: string; label: string }> {
    return this.rowAction?.options || [];
  }

  onRowSelectAction(key: string, row: TableData) {
    if (this.rowAction) this.rowAction.onSelect(key, row);
  }

  get itsColumns() {
    let { columns } = this;
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
      actionColumn = {
        ...actionColumn,
        customHeaderCell: () => ({
          props: {
            bg: 'transparent',
            type: 'action',
          },
        }),
        slots: { title: 'customFilter' },
      };
    }
    if (this.rowAction) {
      if (!actionColumn.customHeaderCell) {
        actionColumn = {
          ...actionColumn,
          customHeaderCell: () => ({
            props: {
              bg: 'transparent',
              type: 'action',
            },
          }),
        };
      }
      columns = [
        ...columns,
        {
          ...actionColumn,
          children: [
            {
              dataIndex: 'action',
              key: 'action',
              width: 32,
              customHeaderCell: () => ({
                props: {
                  bg: 'transparent',
                  type: 'action',
                },
              }),
              customCell: () => ({ props: { type: 'action' } }),
              scopedSlots: { customRender: 'action' },
            },
          ],
        },
      ];
    }
    return columns;
  }

  slotScopeLogger(...args: Array<unknown>) {
    console.log(args);
  }

  onSelectRow({ rowKey }: { checked: boolean; rowKey: string }) {
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

<style scoped></style>
