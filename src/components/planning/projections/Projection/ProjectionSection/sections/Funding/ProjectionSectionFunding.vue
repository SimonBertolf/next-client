<template>
  <funding-table :rows="rows" :loading="false" />
</template>

<script lang="ts">
import type { ProjectionSection } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import FundingTable from './FundingTable.vue';

@Component({ components: { FundingTable } })
export default class ProjectionSectionFunding extends Vue {
  @Prop({ type: Object, required: true }) readonly section!: ProjectionSection;

  get rows(): { name: string; year: number }[] {
    return this.section.inputs.map((item) => ({
      name: item.displayNames.find((name) => name.lang === 'de')?.text || `t('${item.name}')`,
      year: 999,
      _id: item._id,
    }));
  }
}
</script>

<style scoped></style>
