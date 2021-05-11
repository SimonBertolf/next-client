<template>
  <a-table :columns="itsColumns" :data-source="data" :pagination="false">
    <span class="text-dark flex justify-center items-center" slot="customTitle"><a-icon type="edit" /></span>
    <span style="height: 55px;" class="operation-cell flex items-center justify-center" slot="operation">
      <a-icon type="edit" />
    </span>
  </a-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TableColumn, TableData } from '@/types';

@Component
export default class DataTable extends Vue {
  @Prop({ type: Array }) columns: TableColumn[];

  @Prop({ type: Array }) data: TableData[];

  get itsColumns(): TableColumn[] {
    return [
      ...this.columns,
      {
        dataIndex: 'operation',
        key: 'operation',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'operation' },
        className: 'operation-cell',
        width: 10,
      },
    ];
  }
}
</script>

<style>
.ant-table td {
  white-space: nowrap;
}

th[key='operation'] {
  background-color: #e0e0e0 !important;
}

th[key='operation'] > .ant-table-header-column {
  @apply p-0 !important;
}

.operation-cell {
  background-color: #e0e0e0 !important;
  @apply p-0 !important;
}

.ant-table-tbody {
  @apply font-primary text-dark;
}

.ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
.ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
.ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
.ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
  background: unset !important;
  background-color: #eaeaea !important;
}

.ant-table-thead::after {
  content: '';
  display: block;
  height: 1.5em;
  width: 100%;
  background: transparent;
}

.ant-table-thead > tr {
  @apply py-2;
}

.ant-table-row:first-child > td {
  @apply border-t border-divider;
}

.ant-table-row > td:last-child {
  @apply border-r border-divider;
}

th:not(:last-child) > .ant-table-header-column {
  @apply border-r;
}

.ant-table-thead > tr > th {
  white-space: nowrap;
  @apply bg-table text-neutral px-0 py-2;
}

.ant-table-thead > tr > th:first-child {
  @apply rounded-tl rounded-bl;
}

.ant-table-thead > tr > th:last-child {
  @apply rounded-tr rounded-br;
}

.ant-table-thead > tr > th > .ant-table-header-column {
  @apply w-full px-4 font-primary font-light;
}
</style>
