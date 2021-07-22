<template>
  <Layout>
    <template v-slot:header>
      <div class="flex-grow">
        <Heading>{{ name }}</Heading>
      </div>
      <div class="justify-self-end">
        <dashboard-save-button />
      </div>
    </template>
    <div class="mx-4 md:mx-0">
      <Card :autoSize="true" :hasTitle="false" :padding="true">
        <spinner :spinning="loading">
          <sub-nav-menu :items="items" :selected-id="dashboardId" base-path="/dashboards" />
        </spinner>
      </Card>
      <dashboard :dashboard-id="dashboardId" />
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Dashboard as DashboardModel } from '@/models';
import { Layout, Heading, SubNavMenu, Dashboard, Card, Spinner, DashboardSaveButton } from '@/components';
import { SubNavItem } from '@/types';

@Component({ components: { Layout, Heading, SubNavMenu, Dashboard, Card, Spinner, DashboardSaveButton } })
export default class Dashboards extends Vue {
  @Prop({ required: true, type: String }) readonly dashboardId!: string;

  current: string[] = this.dashboardId ? [this.dashboardId] : [];

  name = 'Dashboards';

  get loading(): boolean {
    return !!this.$store.state.Dashboards.loading?.dashboards;
  }

  get items(): SubNavItem[] {
    return this.$store.state.Dashboards.dashboards.map((dashboard: DashboardModel) => ({
      _id: dashboard._id,
      // TODO: set lang automatically from i18n store
      name: dashboard.displayNames.find((displayName) => displayName.lang === 'de')?.text || `t('${dashboard.name}')`,
    }));
  }
}
</script>

<style scoped></style>
