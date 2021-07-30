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
        children: [
          {
            type: 'sub',
            background: 'transparent',
            children: [
              {
                title: 'Total',
                type: 'summary',
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
            type: 'sub',
            background: 'transparent',
            children: [{ type: 'summary', background: 'transparent', dataIndex: 'nr' }],
          },
        ],
      },
      {
        title: 'Miettyp',
        key: 'rentalType',
        children: [
          {
            type: 'sub',
            background: 'transparent',
            children: [{ type: 'summary', background: 'transparent', dataIndex: 'rentalType' }],
          },
        ],
      },
      {
        title: 'Mieter',
        key: 'tenant',
        children: [
          {
            type: 'sub',
            background: 'transparent',
            children: [{ type: 'summary', background: 'transparent', dataIndex: 'tenant' }],
          },
        ],
      },
      {
        title: 'Anzahl',
        key: 'count',
        children: [
          {
            type: 'sub',
            background: 'transparent',
            children: [
              {
                title: this.$options.filters?.tableNumber(this.totalCount),
                type: 'summary',
                background: 'transparent',
                dataIndex: 'count',
                customRender: (text: string) => this.$options.filters?.tableNumber(Number(text)),
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
            type: 'sub',
            background: 'transparent',
            children: [
              {
                title: this.$options.filters?.simpleNumber(this.totalArea),
                type: 'summary',
                background: 'transparent',
                dataIndex: 'area',
                customRender: (text: string) => this.$options.filters?.simpleNumber(Number(text)),
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
            type: 'sub',
            background: 'transparent',
            children: [
              {
                type: 'summary',
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
            type: 'sub',
            background: 'transparent',
            children: [
              {
                type: 'summary',
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
            type: 'sub',
            background: 'transparent',
            children: [
              {
                title: this.$options.filters?.tableNumber(this.totalMarketRent),
                type: 'summary',
                background: 'transparent',
                dataIndex: 'marketRent',
                customRender: (text: string) => this.$options.filters?.tableNumber(text),
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
            type: 'sub',
            background: 'transparent',
            children: [
              {
                title: this.$options.filters?.tableNumber(this.totalNetRent),
                type: 'summary',
                background: 'transparent',
                dataIndex: 'netRent',
                customRender: (text: string) => this.$options.filters?.tableNumber(text),
              },
            ],
          },
        ],
      },
    ];
  }

  get totalCount(): number {
    return this.rentals.reduce((accumulator: number, rental: Rental) => Number(accumulator) + Number(rental.count), 0);
  }

  get totalArea(): number {
    return this.rentals.reduce((accumulator: number, rental: Rental) => Number(accumulator) + Number(rental.area), 0);
  }

  get totalMarketRent(): number {
    return this.rentals.reduce(
      (accumulator: number, rental: Rental) => Number(accumulator) + Number(rental.marketRent),
      0,
    );
  }

  get totalNetRent(): number {
    return this.rentals.reduce(
      (accumulator: number, rental: Rental) => Number(accumulator) + Number(rental.netRent),
      0,
    );
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
