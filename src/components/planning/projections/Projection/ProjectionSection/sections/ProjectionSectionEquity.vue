<template>
  <p>{{ name }}</p>
</template>

<script lang="ts">
import { ProjectionSection } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class ProjectionSectionEquity extends Vue {
  name = 'ProjectionSectionEquity';

  @Prop({ type: Object, required: true }) readonly section!: ProjectionSection;
}
</script>

<style scoped></style>
