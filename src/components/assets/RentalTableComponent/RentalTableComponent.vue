<template>
  <data-table
    :columns="columns"
    :hasFilter="false"
    :scroll="{ x: true }"
    :data="rentals"
    :row-selection="{ onChange: rowSelection }"
    :loading="loading"
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

  @Prop(Boolean) loading: boolean;

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
        key: 'rentalId',
        customRender: () => this.$createElement('span', {}, '-'),
      },
      {
        title: 'Mietobjekt',
        dataIndex: 'nr',
        key: 'nr',
      },
      {
        title: 'Miettyp',
        dataIndex: 'rentalType',
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
        key: 'count',
      },
      {
        title: 'Fläche',
        dataIndex: 'area',
        customRender: (text: string) => this.$options.filters?.simpleNumber(Number(text)),
        key: 'area',
      },
      {
        title: 'Aktiv ab',
        dataIndex: 'activeFrom',
        customRender: (text: string) => this.$options.filters?.dateFormatFilter(text),
        key: 'activeFrom',
      },
      {
        title: 'Aktiv bis',
        dataIndex: 'activeTo',
        customRender: (text: string) => this.$options.filters?.dateFormatFilter(text),
        key: 'activeTo',
      },
      {
        title: 'Markmiete',
        dataIndex: 'marketRent',
        customRender: (text: string) => this.$options.filters?.tableNumber(text),
        key: 'marketRent',
      },
      {
        title: 'Nettomiete',
        dataIndex: 'netRent',
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
