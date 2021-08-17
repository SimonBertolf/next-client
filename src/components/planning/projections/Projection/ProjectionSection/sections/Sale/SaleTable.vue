<template>
  <data-table :columns="columns" :data="rows" :loading="loading" :pageSize="10" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TableColumn } from '@/types';
import { DataTable } from '@/components/app';

@Component({ components: { DataTable } })
export default class SaleTable extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly rows: { name: string; year: number }[];

  @Prop({ type: Boolean, default: true }) readonly loading: boolean;

  get columns(): TableColumn[] {
    return [
      {
        title: 'Name',
        key: 'name',
        width: '17rem',
        dataIndex: 'name',
      },
      {
        title: 'Values...',
        key: 'year',
        dataIndex: 'year',
      },
    ];
  }
}
</script>

<style scoped></style>
