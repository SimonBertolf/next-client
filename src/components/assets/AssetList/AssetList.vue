<template>
  <primary-list-component
    v-if="$store.state.Assets.page"
    :loading="loading"
    :busy="$store.state.Assets.busy"
    :data="assets"
    :load="fetchAssets"
    v-slot="{ item }"
  >
    <asset-list-item :key="item.id" :asset="item" />
  </primary-list-component>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { PrimaryListComponent } from '@/components/app';
import { AssetListItem } from '../AssetListItem';

@Component({
  components: {
    PrimaryListComponent,
    AssetListItem,
  },
})
export default class AssetList extends Vue {
  loading = true;

  mounted(): void {
    if (!this.$store.state.Assets.busy) {
      this.$store
        .dispatch('Assets/loadAssets')
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  get assets(): Array<null> {
    return [];
  }

  fetchAssets(): void {
    this.loading = true;
    this.$store
      .dispatch('Assets/loadAssets')
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
</script>

<style scoped></style>
