<template>
  <p>{{ name }}</p>
</template>

<script lang="ts">
import type { ProjectionSection } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class ProjectionSectionIncome extends Vue {
  name = 'ProjectionSectionIncome';

  @Prop({ type: Object, required: true }) readonly section!: ProjectionSection;
}
</script>

<style scoped></style>
