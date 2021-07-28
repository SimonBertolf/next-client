<template>
  <Layout>
    <template v-if="isReady" v-slot:header>
      <BackButton to="/assets" class="sm:hidden self-start" />
      <Heading>{{ asset.name }}</Heading>
    </template>
    <div v-if="isReady" class="mx-4 md:mx-0">
      <Card :autoSize="true" :hasTitle="false" :padding="true">
        <sub-nav-menu :items="items" :base-path="basePath" />
        <router-view></router-view>
      </Card>
    </div>
    <div v-else class="text-center mt-8">
      <spinner />
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Heading } from '@/components/typography';
import { Layout, Tabs, Card, BackButton, SubNavMenu, Spinner } from '@/components/app';
import { AssetTabs } from '@/components/assets';
import { Asset as AssetModel } from '@/models';

@Component({
  components: {
    Layout,
    Heading,
    Tabs,
    Card,
    AssetTabs,
    BackButton,
    SubNavMenu,
    Spinner,
  },
})
export default class Asset extends Vue {
  @Prop(String) readonly assetId: string;

  items = [
    {
      _id: 'data',
      name: 'Daten',
    },
    {
      _id: 'attributes',
      name: 'Attribute',
    },
  ];

  get asset(): AssetModel {
    return this.$store.state.Assets.asset;
  }

  get basePath(): string {
    return `/assets/${this.assetId}`;
  }

  get isReady(): boolean {
    const { asset } = this.$store.state.Assets;
    if (!asset) return false;
    const { id } = asset;
    if (id !== this.assetId) return false;
    return true;
  }
}
</script>

<style scoped></style>
