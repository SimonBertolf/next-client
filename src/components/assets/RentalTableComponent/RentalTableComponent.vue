<template>
  <data-table :columns="columns" :data="rentals" :loading="loading" :rowSelection="{ onChange: selectRentals }" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import type { Rental } from '@/models';
import { TableColumn, TableColumnTypes } from '@/types';
import { DataTable } from '@/components/app';

@Component({ components: { DataTable } })
export default class RentalTableComponent extends Vue {
  @Prop({ type: Array, required: true }) rentals: Rental[];

  @Prop({ type: Object, required: true }) summary: Pick<Rental, 'count' | 'area' | 'marketRent' | 'netRent'>;

  @Prop({ type: Boolean, default: false }) loading: boolean;

  @Emit()
  selectRentals(selectedRentals: Rental[]): Rental[] {
    return selectedRentals;
  }

  get columns(): TableColumn[] {
    const { count, area, marketRent, netRent } = this.summary;
    return [
      {
        title: 'Nr.',
        key: 'rentalId',
        children: [
          {
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [
              {
                title: 'Total',
                type: TableColumnTypes.SUMMARY,
                background: 'transparent',
                customRender: () => this.$createElement('span', {}, '-'),
              },
            ],
          },
        ],
      },
      {
        title: 'Mietobjekt',
        key: 'nr',
        children: [
          {
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [{ type: TableColumnTypes.SUMMARY, background: 'transparent', dataIndex: 'nr' }],
          },
        ],
      },
      {
        title: 'Miettyp',
        key: 'rentalType',
        children: [
          {
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [{ type: TableColumnTypes.SUMMARY, background: 'transparent', dataIndex: 'rentalType' }],
          },
        ],
      },
      {
        title: 'Mieter',
        key: 'tenant',
        children: [
          {
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [{ type: TableColumnTypes.SUMMARY, background: 'transparent', dataIndex: 'tenant' }],
          },
        ],
      },
      {
        title: 'Anzahl',
        key: 'count',
        children: [
          {
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [
              {
                title: this.$options.filters?.tableNumber(count),
                type: TableColumnTypes.SUMMARY,
                background: 'transparent',
                dataIndex: 'count',
                customRender: (text: string) => this.$options.filters?.tableNumber(+text),
              },
            ],
          },
        ],
      },
      {
        title: 'Fläche',
        key: 'area',
        children: [
          {
            title: 'm²',
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [
              {
                title: this.$options.filters?.simpleNumber(area),
                type: TableColumnTypes.SUMMARY,
                background: 'transparent',
                dataIndex: 'area',
                customRender: (text: string) => this.$options.filters?.simpleNumber(text),
              },
            ],
          },
        ],
      },
      {
        title: 'Aktiv ab',
        key: 'activeFrom',
        children: [
          {
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [
              {
                type: TableColumnTypes.SUMMARY,
                background: 'transparent',
                dataIndex: 'activeFrom',
                customRender: (text: string) => this.$options.filters?.dateFormatFilter(text),
              },
            ],
          },
        ],
      },
      {
        title: 'Aktiv bis',
        key: 'activeTo',
        children: [
          {
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [
              {
                type: TableColumnTypes.SUMMARY,
                background: 'transparent',
                dataIndex: 'activeTo',
                customRender: (text: string) => this.$options.filters?.dateFormatFilter(text),
              },
            ],
          },
        ],
      },
      {
        title: 'Markmiete',
        key: 'marketRent',
        children: [
          {
            title: 'CHF',
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [
              {
                title: this.$options.filters?.tableNumber(marketRent),
                type: TableColumnTypes.SUMMARY,
                background: 'transparent',
                dataIndex: 'marketRent',
                customRender: (text: string) => this.$options.filters?.tableNumber(+text),
              },
            ],
          },
        ],
      },
      {
        title: 'Nettomiete',
        key: 'netRent',
        children: [
          {
            title: 'p.a./m²',
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [
              {
                title: this.$options.filters?.tableNumber(+netRent),
                type: TableColumnTypes.SUMMARY,
                background: 'transparent',
                dataIndex: 'netRent',
                customRender: (text: string) => this.$options.filters?.tableNumber(+text),
              },
            ],
          },
        ],
      },
    ];
  }
}
</script>

<style scoped></style>
