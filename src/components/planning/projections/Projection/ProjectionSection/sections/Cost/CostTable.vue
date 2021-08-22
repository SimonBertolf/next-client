<template>
  <data-table
    :columns="columns"
    :data="rows"
    :loading="loading"
    :pageSize="99"
    class="cost-table"
    :row-class-name="rowClassName"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ProjectionDataColumn, ProjectionTableRow, TableColumn } from '@/types';
import { DataTable } from '@/components/app';

@Component({ components: { DataTable } })
export default class CostTable extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly rows: { name: string; year: number }[];

  @Prop({ type: Boolean, default: true }) readonly loading: boolean;

  private rowClassName = (record: ProjectionTableRow) => record.className;

  get dataColumns(): ProjectionDataColumn[] {
    return this.$store.getters['Projections/dataColumns'];
  }

  get columns(): TableColumn[] {
    return [
      {
        title: 'Name',
        key: 'displayName',
        width: '18rem',
        dataIndex: 'displayName',
        className: 'display-name',
        fixed: 'left',
      },
      {
        title: 'Total',
        key: 'sum',
        width: '5rem',
        dataIndex: 'sum',
        align: 'right',
        className: 'horizontal-sum',
        fixed: 'left',
      },
      ...this.dataColumns.map((col) => ({
        title: col.name,
        key: col.key,
        align: 'right',
        dataIndex: col.key,
      })),
      {
        title: '',
        key: 'end',
        width: '1rem',
        dataIndex: 'end',
        fixed: 'right',
      },
    ];
  }
}
</script>

<style>
.cost-table td.horizontal-sum {
  @apply font-medium !important;
}
.cost-table td.display-name {
  @apply font-medium !important;
}
.cost-table .inputs-sum {
  @apply bg-common-300 !important;
}
</style>
