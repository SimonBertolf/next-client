<template>
  <div>
    <Card :autoSize="true" :hasTitle="false" :padding="true"> Asset KPIs </Card>
    <Card :autoSize="true" :hasTitle="true" :padding="true" class="mt-4">
      <template v-slot:title><span class="font-primary text-2xl">Mietobjekte</span></template>
      <div class="flex flex-row w-full h-full"><rental-table :assetId="assetId" /></div>
    </Card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Card } from '@/components/app';
import { RentalTable } from './RentalTable';

@Component({ components: { RentalTable, Card } })
export default class AssetData extends Vue {
  @Prop(String) assetId: string;
}
</script>

<style scoped></style>
