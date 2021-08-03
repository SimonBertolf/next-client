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
    </a-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import type { TableColumn, TableData, TableComponents, TableComponentRenderer } from '@/types';
import type { VNode } from 'vue';
import { TableResolver, HeaderStyleResolver } from '@/util';
import { Spinner } from '@/components/app/Spinner';
import CustomTable from './CustomTable.vue';
import HeaderCell from './HeaderCell.vue';
import BodyRow from './BodyRow.vue';

@Component
export default class DataTable extends Vue {
  @Prop({ type: Array }) columns: TableColumn[];

  @Prop({ type: Array }) data: TableData[];

  @Prop({ type: Boolean, default: false }) loading: boolean;

  @Prop({ type: Number, default: 5 }) pageSize: number;

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
    return this.tableResolver.resolve(this.columns);
  }

  get tableResolver(): TableResolver {
    const resolver: TableResolver = new HeaderStyleResolver();
    return resolver;
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
.data-table-pagination > .ant-pagination-item:hover a {
  @apply text-primary !important;
}
</style>
