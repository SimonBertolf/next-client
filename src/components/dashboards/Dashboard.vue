<template>
  <div class="dashboard">
    <filter-panel v-if="hasFilters" />
    <widget-layout class="" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Dashboard as DashboardModel } from '@/models';
import { WidgetLayout } from '@/components/reporting';
import FilterPanel from './FilterPanel.vue';

@Component({ components: { WidgetLayout, FilterPanel } })
export default class Dashboard extends Vue {
  @Prop({ required: true, type: String }) readonly dashboardId: string;

  // not used, TODO: remove if not used
  get dashboard() {
    return this.$store.state.Dashboards.dashboard as DashboardModel;
  }

  get hasFilters() {
    return !!this.$store.state.Dashboards.filters.length;
  }
}
</script>

<style scoped></style>
