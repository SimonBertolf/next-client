<template>
  <Layout v-if="isReady">
    <template v-slot:header>
      <BackButton to="/assets" class="sm:hidden self-start" />
      <Heading>{{ name }}</Heading>
    </template>
    <Card :autoSize="true" :hasTitle="false" :padding="false" class="hidden sm:flex">
      <AssetTabs />
    </Card>
    <AssetTabs class="sm:hidden" />
    <data-table :columns="columns" :data="dataForTable" />
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import { Heading } from '@/components/typography';
import { Layout, Tabs, Card, BackButton, DataTable } from '@/components/app';
import { AssetTabs } from '@/components/assets';
import { Asset } from '@/models';

@Component({
  components: {
    Layout,
    Heading,
    Tabs,
    Card,
    AssetTabs,
    BackButton,
    DataTable,
  },
})
export default class Assets extends Vue {
  @Prop(String) readonly assetId: string;

  name = '';

  get isReady() {
    const { asset } = this.$store.state.Assets;
    if (!asset) return false;
    const { id } = asset;
    if (id !== this.assetId) return false;
    return true;
  }

  get columns() {
    return [
      {
        title: 'Date',
        dataIndex: 'date',
        width: 200,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        width: 100,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: 100,
      },
      {
        title: 'Note',
        dataIndex: 'note',
        width: 100,
      },
    ];
  }

  get dataForTable() {
    return [
      {
        key: 0,
        date: '2018-02-11',
        amount: 120,
        type: 'income',
        note: 'transfer',
      },
      {
        key: 1,
        date: '2018-03-11',
        amount: 243,
        type: 'income',
        note: 'transfer',
      },
      {
        key: 2,
        date: '2018-04-11',
        amount: 98,
        type: 'income',
        note: 'transfer',
      },
    ];
  }

  @Watch('$store.state.Assets.asset', { deep: true, immediate: true })
  changeAsset(val: Asset, oldVal: Asset | null) {
    if (val !== null && !_.isEqual(val, oldVal)) this.name = this.$store.state.Assets.asset.name;
  }
}
</script>

<style scoped></style>
