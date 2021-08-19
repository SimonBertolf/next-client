<template>
  <Card v-if="projectionMeta" :autoSize="true" :hasTitle="false" :padding="true" class="mt-4">
    <h2 class="font-primary text-2xl mb-2">{{ title }}</h2>
    <p>{{ name }}</p>
    <p>from: {{ from | dateMonth }} – to: {{ to | dateMonth }}</p>
    <p>years: {{ years }}, quarters: {{ quarters }}, months: {{ months }}</p>
    <resolution-select class="mt-4" />
    <projection-sections class="mt-4" />
  </Card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Card } from '@/components/app';
import { Projection as ProjectionModel, Resolution } from '@/models';
import ProjectionSections from './ProjectionSections.vue';
import ResolutionSelect from './ResolutionSelect.vue';

@Component({ components: { Card, ProjectionSections, ResolutionSelect } })
export default class Projection extends Vue {
  title = 'Cashflow Projection';

  get projectionMeta(): ProjectionModel {
    return this.$store.state.Projections.projectionMeta;
  }

  get name(): string | undefined {
    return this.projectionMeta?.name;
  }

  get from(): Date | undefined {
    return this.projectionMeta?.from;
  }

  get to(): Date | undefined {
    return this.projectionMeta?.to;
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

  get resolution(): Resolution {
    return this.$store.state.Projections.projectionMeta?.resolution;
  }

  @Watch('resolution', { immediate: true, deep: true })
  onResolutionChange(): void {
    this.$store.dispatch('Projections/buildDataColumns');
  }

  @Prop(String) readonly projectionId: string;
}
</script>

<style scoped></style>
