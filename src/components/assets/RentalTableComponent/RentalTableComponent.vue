<template>
  <data-table
    :columns="columns"
    :data="rentals"
    :loading="loading"
    :rowSelection="{ onChange: selectRentals }"
    :rowActions="{
      actions: [{ key: 'delete', label: 'Delete' }],
      onClick: action,
    }"
    @sort="sort"
  />
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
  selectRentals(selectedRentals: string[]): string[] {
    return selectedRentals;
  }

  @Emit()
  action(key: string, _id: string): { key: string; _id: string } {
    return { key, _id };
  }

  @Emit()
  sort(sorter: { direction: string | boolean; key: string }): { direction: string | boolean; key: string } {
    return sorter;
  }

  get columns(): TableColumn[] {
    const { count, area, marketRent, netRent } = this.summary;
    return [
      {
        title: 'Nr.',
        key: 'nr',
        sorter: true,
        direction: 'asc',
        children: [
          {
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [
              {
                title: 'Total',
                type: TableColumnTypes.SUMMARY,
                background: 'transparent',
                dataIndex: 'nr',
                customRender: (text: string) => this.$createElement('span', {}, text || '-'),
              },
            ],
          },
        ],
      },
      {
        title: 'Mietobjekt',
        key: 'property',
        children: [
          {
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [
              {
                type: TableColumnTypes.SUMMARY,
                background: 'transparent',
                dataIndex: 'property',
                editable: true,
                customRender: (text: string) => this.$createElement('span', {}, text || '-'),
              },
            ],
          },
        ],
      },
      {
        title: 'Miettyp',
        key: 'rentalType',
        optional: true,
        children: [
          {
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [
              {
                type: TableColumnTypes.SUMMARY,
                background: 'transparent',
                dataIndex: 'rentalType',
                customRender: (text: string) => this.$createElement('span', {}, text || '-'),
              },
            ],
          },
        ],
      },
      {
        title: 'Mieter',
        key: 'tenant',
        optional: true,
        children: [
          {
            type: TableColumnTypes.UNIT,
            background: 'transparent',
            children: [
              {
                type: TableColumnTypes.SUMMARY,
                background: 'transparent',
                dataIndex: 'tenant',
                customRender: (text: string) => this.$createElement('span', {}, text || '-'),
              },
            ],
          },
        ],
      },
      {
        title: 'Anzahl',
        key: 'count',
        optional: true,
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
        optional: true,
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
        optional: true,
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
        optional: true,
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
        optional: true,
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
        optional: true,
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
