<template>
  <data-table
    :columns="columns"
    :hasFilter="true"
    :scroll="{ x: true, y: 304 }"
    :data="rentals"
    :row-selection="{ onChange: rowSelection }"
    :rowAction="{ options: rowActionOptions, onSelect: rowAction }"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Rental } from '@/models';
import { TableColumn } from '@/types';
import { DataTable } from '@/components/app';

@Component({ components: { DataTable } })
export default class RentalTableComponent extends Vue {
  @Prop({ type: Array }) rentals: Rental[];

  @Emit()
  rowSelection(selectedRows: Rental[]): Rental[] {
    return selectedRows;
  }

  @Emit()
  rowAction(key: string, row: Rental): { key: string; row: Rental } {
    return { key, row };
  }

  get columns(): TableColumn[] {
    return [
      {
        title: 'Nr.',
        width: 100,
        key: 'rentalId',
        customRender: () => this.$createElement('span', {}, '-'),
      },
      {
        title: 'Mietobjekt',
        dataIndex: 'nr',
        width: 100,
        key: 'nr',
      },
      {
        title: 'Miettyp',
        dataIndex: 'rentalType',
        width: 150,
        key: 'rentalType',
      },
      {
        title: 'Mieter',
        dataIndex: 'tenant',
        key: 'tenant',
      },
      {
        title: 'Anzahl',
        dataIndex: 'count',
        customRender: (text: string) => this.$options.filters?.tableNumber(Number(text)),
        width: 75,
        key: 'count',
      },
      {
        title: 'Fläche',
        dataIndex: 'area',
        customRender: (text: string) => this.$options.filters?.simpleNumber(Number(text)),
        width: 90,
        key: 'area',
      },
      {
        title: 'Aktiv ab',
        dataIndex: 'activeFrom',
        width: 100,
        customRender: (text: string) => this.$options.filters?.dateFormatFilter(text),
        key: 'activeFrom',
      },
      {
        title: 'Aktiv bis',
        dataIndex: 'activeTo',
        width: 100,
        customRender: (text: string) => this.$options.filters?.dateFormatFilter(text),
        key: 'activeTo',
      },
      {
        title: 'Markmiete',
        dataIndex: 'marketRent',
        width: 150,
        customRender: (text: string) => this.$options.filters?.tableNumber(text),
        key: 'marketRent',
      },
      {
        title: 'Nettomiete',
        dataIndex: 'netRent',
        width: 150,
        customRender: (text: string) => this.$options.filters?.tableNumber(text),
        key: 'netRent',
      },
    ];
  }

  get rowActionOptions(): Array<{ key: string; label: string }> {
    return [
      {
        key: 'edit',
        label: 'Bearbeiten',
      },
      {
        key: 'delete',
        label: 'Löschen',
      },
      {
        key: 'copy',
        label: 'Kopieren',
      },
      {
        key: 'contracts',
        label: 'Verträge & Sollstellungen',
      },
      {
        key: 'history',
        label: 'Historie',
      },
    ];
  }
}
</script>

<style scoped></style>
