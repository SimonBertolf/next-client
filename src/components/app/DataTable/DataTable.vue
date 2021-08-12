<template>
  <div class="data-table">
    <a-table
      class="w-full"
      :row-key="(record) => record._id"
      :components="itsComponents"
      :columns="itsColumns"
      :data-source="data"
      :scroll="{ x: true }"
      :pagination="{ pageSize, hideOnSinglePage: true, size: 'small', class: 'data-table-pagination' }"
      :loading="{ indicator: spinnerComponent, spinning: loading }"
    >
      <template slot="selection" slot-scope="text, row">
        <row-selector :checked="isChecked(row._id)" @click="() => onSelectRow(row._id)" />
      </template>
      <template slot="action" slot-scope="text, row">
        <row-action-menu :options="rowAction.options" @click="({ key }) => rowAction.onClick(key, row._id)" />
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import type { TableColumn, TableData, TableComponents, TableComponentRenderer } from '@/types';
import type { VNode } from 'vue';
import { TableResolver, TableResolverBuilder, DataTableResolverBuilder } from '@/util';
import { Spinner } from '@/components/app/Spinner';
import CustomTable from './CustomTable.vue';
import HeaderCell from './HeaderCell.vue';
import BodyRow from './BodyRow.vue';
import RowSelector from './RowSelector.vue';
import RowActionMenu from './RowActionMenu.vue';

@Component({ components: { RowSelector, RowActionMenu } })
export default class DataTable extends Vue {
  @Prop({ type: Array, required: true }) columns: TableColumn[];

  @Prop({ type: Array, required: true }) data: TableData[];

  @Prop({ type: Boolean, default: false }) loading: boolean;

  @Prop({ type: Number, default: 5 }) pageSize: number;

  @Prop({ type: [Object, Boolean], default: false }) rowSelection: { onChange: (selectedRows: string[]) => void };

  @Prop({ type: [Object, Boolean], default: false })
  rowAction: { options: Array<{ key: string; label: string }>; onClick: (actionKey: string, rowKey: string) => void };

  selectedRows: string[] = [];

  private resolver: TableResolver;

  created(): void {
    const builder: TableResolverBuilder = new DataTableResolverBuilder();
    if (this.rowSelection) builder.setRowSelection(true);
    if (this.rowAction) builder.setRowAction(true);
    this.resolver = builder.build();
  }

  get itsComponents(): TableComponents {
    const table: TableComponentRenderer = (h, p, c) => h(CustomTable, { ...p }, c);
    const cell: TableComponentRenderer = (h, p, c) => h(HeaderCell, { ...p }, c);
    const bodyRow: TableComponentRenderer = (h, p, c) => h(BodyRow, { ...p }, c);
    return { table, header: { cell }, body: { row: bodyRow } };
  }

  get spinnerComponent(): VNode {
    return this.$createElement(Spinner, { props: { spinning: true } });
  }

  get itsColumns(): TableColumn[] {
    return this.resolver.resolve(this.columns);
  }

  onSelectRow(rowKey: string): void {
    const newSelectedRows = [...this.selectedRows];
    const rowIndex = newSelectedRows.findIndex((id: string) => id === rowKey);
    if (rowIndex === -1) {
      newSelectedRows.push(rowKey);
    } else {
      newSelectedRows.splice(rowIndex, 1);
    }
    this.selectedRows = newSelectedRows;
    this.rowSelection?.onChange([...this.selectedRows]);
  }

  isChecked(rowKey: string): boolean {
    return this.selectedRows.includes(rowKey);
  }
}
</script>

<style>
.data-table {
  @apply w-full;
}
.data-table-pagination {
  @apply mb-0 !important;
}
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
.data-table-pagination > .ant-pagination-item:hover a,
.data-table-pagination > .ant-pagination-next:focus a,
.data-table-pagination > .ant-pagination-prev:focus a {
  @apply text-primary !important;
}
</style>
