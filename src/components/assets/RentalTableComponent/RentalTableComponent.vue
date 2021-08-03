<template>
  <data-table :columns="columns" :data="rentals" :loading="loading" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import type { Rental } from '@/models';
import type { TableColumn } from '@/types';
import { DataTable } from '@/components/app';

@Component({ components: { DataTable } })
export default class RentalTableComponent extends Vue {
  @Prop({ type: Array, required: true }) rentals: Rental[];

  @Prop({ type: Object, required: true }) summary: Pick<Rental, 'count' | 'area' | 'marketRent' | 'netRent'>;

  @Prop(Boolean) loading: boolean;

  get columns(): TableColumn[] {
    const { count, area, marketRent, netRent } = this.summary;
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
                title: this.$options.filters?.tableNumber(count),
                type: 'summary',
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
            type: 'sub',
            background: 'transparent',
            children: [
              {
                title: this.$options.filters?.simpleNumber(area),
                type: 'summary',
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
                title: this.$options.filters?.tableNumber(marketRent),
                type: 'summary',
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
            type: 'sub',
            background: 'transparent',
            children: [
              {
                title: this.$options.filters?.tableNumber(+netRent),
                type: 'summary',
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
