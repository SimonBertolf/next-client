<template>
  <Card :autoSize="true" :hasTitle="false" :padding="true" class="mt-4">
    <h2 class="text-4xl mb-2">{{ title }}</h2>
    <p>{{ name }}</p>
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

  @Prop(String) readonly projectionId: string;
}
</script>

<style scoped></style>
