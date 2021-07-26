<template>
  <Layout>
    <template v-slot:header>
      <div class="flex-grow">
        <Heading>{{ name }}</Heading>
      </div>
      <div v-if="hasReport">
        <report-pdf-button />
      </div>
    </template>
    <div class="mx-4 md:mx-0">
      <Card :autoSize="true" :hasTitle="false" :padding="true" class="mb-4">
        <sub-nav-menu :items="items" base-path="/reporting" />
      </Card>
      <router-view></router-view>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Layout, Heading, SubNavMenu, Card, ReportPdfButton } from '@/components';

@Component({ components: { Layout, Heading, SubNavMenu, Card, ReportPdfButton } })
export default class Reporting extends Vue {
  name = 'Reporting';

  get hasReport(): boolean {
    return !!this.$store.state.Reports.report;
  }

  items = [
    {
      _id: 'reports',
      name: 'Reports',
    },
    {
      _id: 'analysis',
      name: 'Analysis',
    },
  ];
}
</script>

<style scoped></style>
