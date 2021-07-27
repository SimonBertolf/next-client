<template>
  <div class="flex flex-row w-full h-full">
    <sub-nav-menu :items="items" :base-path="basePath" mode="vertical" />
    <div class="w-full h-full pl-4"><router-view></router-view></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { SubNavMenu } from '@/components/app';

@Component({ components: { SubNavMenu } })
export default class AssetData extends Vue {
  @Prop(String) assetId: string;

  get items(): Array<{ _id: string; name: string }> {
    return [
      {
        _id: 'rentals',
        name: 'Mietobjekt',
      },
    ];
  }

  get basePath(): string {
    return `/assets/${this.assetId}/data`;
  }
}
</script>

<style scoped></style>
