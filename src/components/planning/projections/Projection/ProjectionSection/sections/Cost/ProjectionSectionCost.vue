<template>
  <cost-table :rows="rows" :loading="false" />
</template>

<script lang="ts">
import type { ProjectionSection, Resolution } from '@/models';
import type { TableData } from '@/types';
import { ProjectionResolverBuilder, ProjectionResolverBuilderInterface, ProjectionResolverInterface } from '@/util';
import { cloneDeep } from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';
import CostTable from './CostTable.vue';

@Component({ components: { CostTable } })
export default class ProjectionSectionCost extends Vue {
  @Prop({ type: Object, required: true }) readonly section!: ProjectionSection;

  private resolver: ProjectionResolverInterface;

  created(): void {
    const builder: ProjectionResolverBuilderInterface = new ProjectionResolverBuilder();
    builder.addResolutionResolver();
    this.resolver = builder.build();
  }

  get columnDates(): Date[] {
    return this.$store.getters['Projections/columnDates'];
  }

  get resolution(): Resolution {
    return this.$store.state.Projections.projectionMeta?.resolution || 'monthly';
  }

  get rows(): TableData[] {
    const { inputs } = this.section;
    const { rows } = this.resolver.resolve({
      columnDates: this.columnDates,
      resolution: this.resolution,
      rows: [...new Array(inputs.length)].map((item, index) => ({
        _id: inputs[index]._id,
        name: inputs[index].displayNames.find((name) => name.lang === 'de')?.text || `t('${inputs[index].name}')`,
      })),
      inputs: cloneDeep(inputs),
    });
    return rows;
  }
}
</script>

<style scoped></style>
