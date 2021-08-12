<template>
  <div class="data-table">
    <span v-if="hasColumnFilter" class="self-end">
      <column-filter :options="columnFilterOptions" @filter="onColumnFilter" />
    </span>
    <a-table
      class="w-full"
      :row-key="(record) => record._id"
      :components="itsComponents"
      :columns="filteredColumns"
      :data-source="data"
      :scroll="{ x: true }"
      :pagination="{ pageSize, hideOnSinglePage: true, size: 'small', class: 'data-table-pagination' }"
      :loading="{ indicator: spinnerComponent, spinning: loading }"
    >
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
      <template slot="selection" slot-scope="text, row">
        <row-selector :checked="isChecked(row._id)" @click="() => onSelectRow(row._id)" />
      </template>
      <template slot="action" slot-scope="text, row">
        <row-action-menu :options="rowActions.actions" @click="({ key }) => rowActions.onClick(key, row._id)" />
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import _ from 'lodash';
import type { TableColumn, TableData, TableComponents, TableComponentRenderer } from '@/types';
import type { VNode } from 'vue';
import { TableResolver, TableResolverBuilder, DataTableResolverBuilder } from '@/util';
import { Spinner } from '@/components/app/Spinner';
import CustomTable from './CustomTable.vue';
import HeaderCell from './HeaderCell.vue';
import BodyRow from './BodyRow.vue';
import RowSelector from './RowSelector.vue';
import RowActionMenu from './RowActionMenu.vue';
import ColumnFilter from './ColumnFilter.vue';

@Component({ components: { RowSelector, RowActionMenu, ColumnFilter } })
export default class DataTable extends Vue {
  @Prop({ type: Array, required: true }) columns: TableColumn[];

  @Prop({ type: Array, required: true }) data: TableData[];

  @Prop({ type: Boolean, default: false }) loading: boolean;

  @Prop({ type: Number, default: 5 }) pageSize: number;

  @Prop({ type: [Object, Boolean], default: false }) rowSelection: { onChange: (selectedRows: string[]) => void };

  @Prop({ type: [Object, Boolean], default: false })
  rowActions: { actions: Array<{ key: string; label: string }>; onClick: (actionKey: string, rowKey: string) => void };

  selectedRows: string[] = [];

  private resolver: TableResolver;

  filteredColumns: TableColumn[] = [];

  currentSorter: { direction: string | boolean; key: string } = { direction: false, key: '' };

  created(): void {
    const builder: TableResolverBuilder = new DataTableResolverBuilder();
    if (this.rowSelection) builder.addRowSelection();
    if (this.rowActions) builder.addRowAction();
    builder.addTableSorter();
    this.resolver = builder.build();
  }

  mounted(): void {
    this.filteredColumns = this.itsColumns;
  }

  @Watch('columns', { immediate: false, deep: true })
  handleColumnsChange(val: TableColumn[], oldVal: TableColumn[]): void {
    if (!_.isEqual(val, oldVal)) {
      const cols = [...this.itsColumns];
      this.filteredColumns = this.filteredColumns.map((col) => cols.find((c) => c.key === col.key) as TableColumn);
    }
  }

  @Watch('currentSorter', { immediate: false, deep: true })
  handleCurrentSorter(
    val: boolean | { direction: string | boolean; key: string },
    oldVal: boolean | { direction: string | boolean; key: string },
  ): void {
    if (!_.isEqual(val, oldVal)) {
      const cols = [...this.itsColumns];
      this.filteredColumns = this.filteredColumns.map((col) => cols.find((c) => c.key === col.key) as TableColumn);
    }
  }

  @Emit()
  sort(direction: string | boolean, key: string): { direction: string | boolean; key: string } {
    if (direction) {
      this.currentSorter = {
        direction,
        key,
      };
    } else {
      this.currentSorter = { direction: false, key: '' };
    }
    return { direction, key };
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
    return this.resolver.resolve({ cols: this.columns, sorter: { ...this.currentSorter, handler: this.sort } });
  }

  get hasColumnFilter(): boolean {
    const filterableColumns = this.columns.filter((col) => col.optional);
    return filterableColumns.length !== 0;
  }

  get columnFilterOptions(): Array<{ key: string; label: string }> {
    const filterableColumns = this.columns.filter((col) => col.optional);
    return filterableColumns.map((col) => {
      const { key = '', title = '' } = col;
      const label = title as string;
      return { key, label };
    });
  }

  isChecked(rowKey: string): boolean {
    return this.selectedRows.includes(rowKey);
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

  onColumnFilter({ checked, key }: { checked: boolean; key: string }): void {
    if (!checked) {
      this.filteredColumns = this.filteredColumns.filter((col) => col.key !== key);
    } else {
      const itsFilteredColumns: TableColumn[] = [];
      const allColumns = this.itsColumns;
      allColumns.forEach((col) => {
        if (col.key === key) {
          itsFilteredColumns.push(col);
        } else {
          const colInFilter = this.filteredColumns.find((c) => c.key === col.key);
          if (colInFilter) itsFilteredColumns.push(colInFilter);
        }
      });
      this.filteredColumns = [...itsFilteredColumns];
    }
  }
}
</script>

<style>
.data-table {
  @apply w-full flex flex-col;
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
