<template>
  <data-table
    :columns="columns"
    :data="rows"
    :loading="loading"
    :pageSize="99"
    class="income-table"
    :row-class-name="rowClassName"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ProjectionDataColumn, ProjectionTableRow, TableColumn } from '@/types';
import { DataTable } from '@/components/app';
import { tableNumberFilter } from '@/util';

@Component({ components: { DataTable } })
export default class IncomeTable extends Vue {
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
        className: 'horizontal-sum',
        align: 'right',
        fixed: 'left',
        customRender: (text: string | number) => this.$createElement('span', {}, tableNumberFilter(text as number)),
      },
      ...this.dataColumns.map((col) => ({
        title: col.name,
        key: col.key,
        align: 'right',
        dataIndex: col.key,
        customRender: (text: string | number) => this.$createElement('span', {}, tableNumberFilter(text as number)),
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
.income-table td.horizontal-sum {
  @apply font-medium !important;
}
.income-table td.display-name {
  @apply font-medium !important;
}
.income-table .inputs-sum {
  @apply bg-common-300 !important;
}
</style>
