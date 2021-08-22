<template>
  <sale-table :rows="rows" :loading="false" />
</template>

<script lang="ts">
import type { ProjectionActual, ProjectionSection, Resolution } from '@/models';
import type { ProjectionTableRow } from '@/types';
import { ProjectionResolverBuilder, ProjectionResolverBuilderInterface, ProjectionResolverInterface } from '@/util';
import { cloneDeep } from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';
import SaleTable from './SaleTable.vue';

@Component({ components: { SaleTable } })
export default class ProjectionSectionSale extends Vue {
  @Prop({ type: Object, required: true }) readonly section!: ProjectionSection;

  private resolver: ProjectionResolverInterface;

  created(): void {
    const builder: ProjectionResolverBuilderInterface = new ProjectionResolverBuilder();
    builder.addInputResolver();
    builder.addSectionActualsResolver();
    builder.addHorizintalSumResolver();
    builder.addResolutionResolver();
    this.resolver = builder.build();
  }

  get columnDates(): Date[] {
    return this.$store.getters['Projections/columnDates'];
  }

  get resolution(): Resolution {
    return this.$store.state.Projections.projectionMeta?.resolution || 'monthly';
  }

  get actuals(): ProjectionActual[] {
    return this.$store.state.Projections.actuals;
  }

  get rows(): ProjectionTableRow[] {
    const { rows } = this.resolver.resolve({
      columnDates: this.columnDates,
      resolution: this.resolution,
      rows: [],
      section: cloneDeep(this.section),
      actuals: this.actuals,
    });
    return rows;
  }
}
</script>

<style scoped></style>
