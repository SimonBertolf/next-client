<template>
  <cost-table :rows="rows" :loading="false" />
</template>

<script lang="ts">
import type { ProjectionSection } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import CostTable from './CostTable.vue';

@Component({ components: { CostTable } })
export default class ProjectionSectionCost extends Vue {
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
