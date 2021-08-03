<template>
  <div class="flex flex-row w-full h-full pt-4"><rental-table :assetId="assetId" /></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RentalTable } from './RentalTable';

@Component({ components: { RentalTable } })
export default class AssetData extends Vue {
  @Prop(String) assetId: string;
}
</script>

<style scoped></style>
