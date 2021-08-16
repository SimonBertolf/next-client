<template>
  <a-collapse class="projection-sections">
    <a-collapse-panel
      v-for="section in sections"
      :key="`${section.type}-${section.name}`"
      :header="makeHeader(section)"
    >
      <projection-section :section="section" />
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ProjectionSection as ProjectionSectionModel } from '@/models';
import { ProjectionSection } from './ProjectionSection';

@Component({ components: { ProjectionSection } })
export default class ProjectionSections extends Vue {
  name = 'ProjectionSections';

  makeHeader(section: ProjectionSectionModel): string {
    return `${section.displayNames.find((name) => name.lang === 'de')?.text || `t('${section.type}-${section.name}')`}`;
  }

  get sections(): ProjectionSectionModel[] {
    return this.$store.state.Projections.projection?.sections;
  }
}
</script>

<style>
.projection-sections {
  @apply bg-neutral border-0 -ml-4 !important;
}

.projection-sections .ant-collapse-item {
  @apply border-0 mb-4 !important;
}

.projection-sections .ant-collapse-content {
  @apply border-0 bg-neutral !important;
}

.projection-sections .ant-collapse-content-box {
  @apply bg-neutral !important;
}

.projection-sections .ant-collapse-header {
  @apply text-2xl !important;
}

.projection-sections .ant-collapse-content-box {
  @apply py-0 pl-10 pr-0 !important;
}
</style>
