<template>
  <Layout>
    <template v-slot:header
      ><Heading>{{ name }}</Heading>
    </template>
    <div class="mx-4 md:mx-0">
      <Card :autoSize="true" :hasTitle="false" :padding="true">
        <sub-nav-menu :items="items" :selected-id="dashboardId" base-path="/dashboards" />
      </Card>
      <dashboard :dashboard-id="dashboardId" />
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Dashboard as DashboardModel } from '@/models';
import { Layout, Heading, SubNavMenu, Dashboard, Card } from '@/components';

@Component({ components: { Layout, Heading, SubNavMenu, Dashboard, Card } })
export default class Dashboards extends Vue {
  @Prop({ required: true, type: String }) readonly dashboardId!: string;

  current: string[] = this.dashboardId ? [this.dashboardId] : [];

  name = 'Dashboards';

  get items(): DashboardModel[] {
    return this.$store.state.Dashboards.dashboards;
  }
}
</script>

<style scoped></style>
