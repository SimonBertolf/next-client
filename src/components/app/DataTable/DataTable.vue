<template>
  <a-table :columns="itsColumns" :data-source="data" :pagination="false" :scroll="{ x: true }"></a-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TableColumn, TableData } from '@/types';
import { TableActionButton } from '../TableActionButton';

@Component({ components: { TableActionButton } })
export default class DataTable extends Vue {
  @Prop({ type: Array }) columns: TableColumn[];

  @Prop({ type: Array }) data: TableData[];

  @Prop({
    type: [Object as () => { onOperationHeader: Function; onOperationCell: Function }, Boolean],
    default: () => false,
  })
  operation: { onOperationHeader: Function; onOperationCell: Function } | boolean;

  get itsColumns() {
    if (!this.operation) return this.columns;
    const { onOperationHeader, onOperationCell } = this.operation as {
      onOperationHeader: Function;
      onOperationCell: Function;
    };
    const itsProps = { props: { onAction: onOperationCell }, style: 'height: 55px !important;' };
    return [
      ...this.columns,
      {
        title: this.$createElement(TableActionButton, { props: { onAction: onOperationHeader } }),
        key: 'operation',
        customRender: () => this.$createElement(TableActionButton, itsProps),
        className: 'operation-cell',
        width: 10,
      },
    ];
  }
}
</script>

<style>
[ant-click-animating-without-extra-node='true']::after,
.ant-click-animating-node::after,
.ant-click-animating-node {
  @apply shadow-none hidden !important;
}

.ant-table-body {
  @apply scrollbar-thin scrollbar-thumb-thumb scrollbar-thumb-rounded scrollbar-track-background;
  @apply lg:overflow-x-hidden hover:overflow-x-auto !important;
}

.ant-table td {
  white-space: nowrap;
}

th[key='operation'] {
  background-color: #f0f0f0 !important;
}

th[key='operation'] > .ant-table-header-column {
  @apply border-l-0 !important;
}

th[key='operation'] > .ant-table-header-column {
  @apply p-0 !important;
}

.operation-cell {
  background-color: #f0f0f0 !important;
  @apply p-0 h-full !important;
}

.operation-cell:hover,
.operation-cell:active,
.operation-cell:focus {
  background-color: #dbdbdb !important;
}

.ant-table-tbody {
  @apply font-primary text-dark;
}

.ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td:not(.operation-cell),
.ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td:not(.operation-cell),
.ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td:not(.operation-cell),
.ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td:not(.operation-cell) {
  background: unset !important;
  background-color: #f5f5f5 !important;
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

th:not(:first-child) > .ant-table-header-column {
  @apply border-l;
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
