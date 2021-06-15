<template>
  <div class="dashboard m-4">
    <p>
      Hier kommt das
      <span class="font-bold">{{ dashboard.name }}</span>
      Dashboard (_id: {{ dashboardId }})
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Dashboard as DashboardInterface } from '@/types';

@Component({ components: {} })
export default class Dashboard extends Vue {
  @Prop({ required: true, type: String }) readonly dashboardId: string;

  get dashboard() {
    // TODO: maybe it makes sense to move this logic to store module?
    const dashboardData = this.$store.state.Dashboards.dashboards.find(
      (dashboard: DashboardInterface) => dashboard._id === this.dashboardId,
    );
    if (!dashboardData) {
      this.$router.push('/404');
      throw new Error(`Could not find dashboard with _id ${this.dashboardId}`);
    }
    return dashboardData;
  }
}
</script>

<style scoped></style>
