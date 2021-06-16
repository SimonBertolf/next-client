<template>
  <Layout>
    <template v-slot:header>
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
      <a-spin>
        <a-icon slot="indicator" type="loading" style="font-size: 24px; color: #252d48;" spin />
      </a-spin>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import { Heading } from '@/components/typography';
import { Layout, Tabs, Card, BackButton, SubNavMenu } from '@/components/app';
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

  get asset() {
    // TODO: remove this and use isReady and vuex store
    const data = this.$store.state.Assets.assets.find((asset: AssetModel) => asset.id === this.assetId);
    if (!data) {
      this.$router.push('/404');
      throw new Error(`Could not find asset with _id ${this.assetId}`);
    }
    return data;
  }

  get basePath() {
    return `/assets/${this.assetId}`;
  }

  get isReady() {
    // TODO: uncomment when repository mocks are ready
    // const { asset } = this.$store.state.Assets;
    // if (!asset) return false;
    // const { id } = asset;
    // if (id !== this.assetId) return false;
    return true;
  }

  @Watch('$store.state.Assets.asset', { deep: true, immediate: true })
  changeAsset(val: AssetModel, oldVal: AssetModel | null) {
    if (val !== null && !_.isEqual(val, oldVal)) this.asset.name = this.$store.state.Assets.asset.name;
  }
}
</script>

<style scoped></style>
