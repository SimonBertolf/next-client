<template>
  <data-table :columns="columns" :data="rows" :loading="loading" :pageSize="99" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ProjectionDataColumn, TableColumn } from '@/types';
import { DataTable } from '@/components/app';

@Component({ components: { DataTable } })
export default class FundingTable extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly rows: { name: string; year: number }[];

  @Prop({ type: Boolean, default: true }) readonly loading: boolean;

  get dataColumns(): ProjectionDataColumn[] {
    return this.$store.getters['Projections/dataColumns'];
  }

  get columns(): TableColumn[] {
    return [
      {
        title: 'Name',
        key: 'displayName',
        width: '17rem',
        dataIndex: 'displayName',
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

<style scoped></style>
