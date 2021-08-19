<template>
  <income-table :rows="rows" :loading="false" />
</template>

<script lang="ts">
import type { ProjectionSection } from '@/models';
import type { TableData } from '@/types';
import { Vue, Component, Prop } from 'vue-property-decorator';
import IncomeTable from './IncomeTable.vue';

@Component({ components: { IncomeTable } })
export default class ProjectionSectionIncome extends Vue {
  @Prop({ type: Object, required: true }) readonly section!: ProjectionSection;

  get rows(): TableData[] {
    return this.section.inputs.map((item) => ({
      name: item.displayNames.find((name) => name.lang === 'de')?.text || `t('${item.name}')`,
      year: 999,
      _id: item._id,
    }));
  }
}
</script>

<style scoped></style>
