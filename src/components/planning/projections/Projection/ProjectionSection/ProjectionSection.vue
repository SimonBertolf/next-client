<template>
  <component :is="componentName" :section="section" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ProjectionSection as ProjectionSectionModel } from '@/models';
import * as sectionComponents from './sections';

@Component({ components: { ...sectionComponents } })
export default class ProjectionSection extends Vue {
  name = 'ProjectionSection';

  @Prop({ type: Object, required: true }) readonly section: ProjectionSectionModel;

  get type(): string {
    return this.section.type;
  }

  get componentName(): string {
    return `ProjectionSection${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`;
  }
}
</script>

<style scoped></style>
