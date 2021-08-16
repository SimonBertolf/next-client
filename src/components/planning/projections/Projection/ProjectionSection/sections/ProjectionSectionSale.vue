<template>
  <pre>{{ rawData }}</pre>
</template>

<script lang="ts">
import { ProjectionSection } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class ProjectionSectionSale extends Vue {
  name = 'ProjectionSectionSale';

  @Prop({ type: Object, required: true }) readonly section!: ProjectionSection;

  get rawData(): string {
    return JSON.stringify(this.section.inputs, null, 2);
  }
}
</script>

<style scoped></style>
