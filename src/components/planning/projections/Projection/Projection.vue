<template>
  <Card v-if="projection" :autoSize="true" :hasTitle="false" :padding="true" class="mt-4">
    <h2 class="font-primary text-2xl mb-2">{{ title }}</h2>
    <p>{{ name }}</p>
    <p>from: {{ from | dateMonth }} – to: {{ to | dateMonth }}</p>
    <p>years: {{ years }}, quarters: {{ quarters }}, months: {{ months }}</p>
    <projection-sections class="mt-4" />
  </Card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Card } from '@/components/app';
import { Projection as ProjectionModel } from '@/models';
import ProjectionSections from './ProjectionSections.vue';

@Component({ components: { Card, ProjectionSections } })
export default class Projection extends Vue {
  title = 'Cashflow Projection';

  get projection(): ProjectionModel {
    return this.$store.state.Projections.projection;
  }

  get name(): string | undefined {
    return this.projection?.name;
  }

  get from(): Date | undefined {
    return this.projection?.from;
  }

  get to(): Date | undefined {
    return this.projection?.to;
  }

  get years(): number {
    return this.$store.getters['Projections/years'];
  }

  get quarters(): number {
    return this.$store.getters['Projections/quarters'];
  }

  get months(): number {
    return this.$store.getters['Projections/months'];
  }

  @Prop(String) readonly projectionId: string;
}
</script>

<style scoped></style>
