<template>
  <a-collapse class="projection-sections" :activeKey="initialActiveKey" :destroyInactivePanel="true">
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
    return this.$store.state.Projections.sections;
  }

  get initialActiveKey(): string[] {
    return []; // this.sections.map((section) => `${section.type}-${section.name}`);
  }
}
</script>

<style>
.projection-sections {
  @apply bg-white border-0 -ml-4 !important;
}

.projection-sections .ant-collapse-item {
  @apply border-0 mb-4 !important;
}

.projection-sections .ant-collapse-content {
  @apply border-0 bg-white !important;
}

.projection-sections .ant-collapse-content-box {
  @apply bg-white !important;
}

.projection-sections .ant-collapse-header {
  @apply text-2xl !important;
}

.projection-sections .ant-collapse-content-box {
  @apply py-0 pl-10 pr-0 !important;
}
</style>
