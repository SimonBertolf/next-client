<template>
  <div class="dashboard">
    <filter-panel v-if="hasFilters" />
    <widget-layout />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Dashboard as DashboardModel } from '@/models';
import { WidgetLayout } from '@/components/app';
import FilterPanel from './FilterPanel.vue';

@Component({ components: { WidgetLayout, FilterPanel } })
export default class Dashboard extends Vue {
  @Prop({ required: true, type: String }) readonly dashboardId: string;

  // not used, TODO: remove if not used
  get dashboard(): DashboardModel | null {
    return this.$store.state.Dashboards.dashboard;
  }

  get hasFilters() {
    return !!this.$store.state.Dashboards.filters.length;
  }
}
</script>

<style scoped></style>
