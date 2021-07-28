<template>
  <div class="flex flex-row w-full h-full"><rental-table :assetId="assetId" /></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RentalTable } from './RentalTable';

@Component({ components: { RentalTable } })
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
