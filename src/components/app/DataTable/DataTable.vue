<template>
  <a-table
    class="w-full"
    :row-key="(record) => record._id"
    :components="itsComponents"
    :columns="itsColumns"
    :data-source="data"
    :scroll="{ x: true }"
    :pagination="{ pageSize: 5, hideOnSinglePage: true, size: 'small', class: 'data-table-pagination' }"
    :loading="{ indicator: spinnerComponent, spinning: loading }"
  >
  </a-table>
</template>

<script lang="ts">
// TODO: remove all any's and following comment!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TableColumn, TableData } from '@/types';
import { VNode, VNodeData } from 'vue';
import { TableResolver, HeaderStyleResolver } from '@/util';
import { Spinner } from '@/components/app/Spinner';
import CustomTable from './CustomTable.vue';
import HeaderRow from './HeaderRow.vue';
import HeaderCell from './HeaderCell.vue';
import BodyRow from './BodyRow.vue';
import BodyCell from './BodyCell.vue';

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

@Component
export default class DataTable extends Vue {
  @Prop({ type: Array }) columns: TableColumn[];

  @Prop({ type: Array }) data: TableData[];

  @Prop({ type: Boolean, default: false }) loading: boolean;

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

  get itsColumns(): TableColumn[] {
    return this.tableResolver.resolve(this.columns);
  }

  get tableResolver(): TableResolver {
    const resolver: TableResolver = new HeaderStyleResolver();
    return resolver;
  }
}
</script>

<style>
.data-table-pagination > .ant-pagination-item-active {
  @apply border-primary !important;
}
.data-table-pagination > .ant-pagination-item-active > a {
  @apply text-primary !important;
}
.data-table-pagination > .ant-pagination-item > a {
  @apply hover:text-primary !important;
}
.data-table-pagination > li:not(.ant-pagination-disabled) > a {
  @apply hover:text-primary !important;
}
.data-table-pagination > .ant-pagination-item:hover a {
  @apply text-primary !important;
}
</style>
