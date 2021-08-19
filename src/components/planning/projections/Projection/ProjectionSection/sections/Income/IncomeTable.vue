<template>
  <data-table :columns="columns" :data="rows" :loading="loading" :pageSize="10" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { DataColumn, TableColumn } from '@/types';
import { DataTable } from '@/components/app';

@Component({ components: { DataTable } })
export default class IncomeTable extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly rows: { name: string; year: number }[];

  @Prop({ type: Boolean, default: true }) readonly loading: boolean;

  get dataColumns(): DataColumn[] {
    return this.$store.state.Projections.dataColumns;
  }

  get columns(): TableColumn[] {
    return [
      {
        title: 'Name',
        key: 'name',
        width: '17rem',
        dataIndex: 'name',
        fixed: 'left',
      },
      ...this.dataColumns.map((col) => ({
        title: col.name,
        key: col.name,
        dataIndex: col.name,
      })),
    ];
  }
}
</script>

<style scoped></style>
