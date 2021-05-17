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
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import { Heading } from '@/components/typography';
import { Layout, Tabs, Card, BackButton } from '@/components/app';
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

  @Watch('$store.state.Assets.asset', { deep: true, immediate: true })
  changeAsset(val: Asset, oldVal: Asset | null) {
    if (val !== null && !_.isEqual(val, oldVal)) this.name = this.$store.state.Assets.asset.name;
  }
}
</script>

<style scoped></style>
