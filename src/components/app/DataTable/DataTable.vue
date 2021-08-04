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
    </a-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import type { TableColumn, TableData, TableComponents, TableComponentRenderer } from '@/types';
import type { VNode } from 'vue';
import { TableResolver, HeaderStyleResolver, RowSelectionResolver } from '@/util';
import { Spinner } from '@/components/app/Spinner';
import CustomTable from './CustomTable.vue';
import HeaderCell from './HeaderCell.vue';
import BodyRow from './BodyRow.vue';
import RowSelector from './RowSelector.vue';

@Component({ components: { RowSelector } })
export default class DataTable extends Vue {
  @Prop({ type: Array, required: true }) columns: TableColumn[];

  @Prop({ type: Array, required: true }) data: TableData[];

  @Prop({ type: Boolean, default: false }) loading: boolean;

  @Prop({ type: Number, default: 5 }) pageSize: number;

  @Prop({ type: [Object, Boolean], default: false }) rowSelection: { onChange(selectedRows: TableData[]): void };

  selectedRows: TableData[] = [];

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

  get resolver(): TableResolver {
    let resolver: TableResolver = new HeaderStyleResolver();
    let nextResolver = null;
    if (this.rowSelection) {
      nextResolver = new RowSelectionResolver();
      nextResolver.setNext(resolver);
      resolver = nextResolver;
    }
    return resolver;
  }

  onSelectRow(rowKey: string): void {
    const row = this.selectedRows.find(({ _id }) => _id === rowKey);
    if (row) {
      this.selectedRows = this.selectedRows.filter(({ _id }) => _id !== rowKey);
    } else {
      const selectedRow = this.data.find(({ _id }) => _id === rowKey);
      if (selectedRow) this.selectedRows = [...this.selectedRows, selectedRow];
    }
    this.rowSelection?.onChange([...this.selectedRows]);
  }

  isChecked(rowKey: string): boolean {
    const row = this.selectedRows.find(({ _id }) => _id === rowKey);
    if (row) return true;
    return false;
  }
}
</script>

<style>
.data-table {
  @apply w-full;
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
