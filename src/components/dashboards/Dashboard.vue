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
import { Dashboard as DashboardModel } from '@/models';

@Component({ components: {} })
export default class Dashboard extends Vue {
  @Prop({ required: true, type: String }) readonly dashboardId: string;

  get dashboard() {
    // TODO: maybe it makes sense to move this logic to store module?
    const data = this.$store.state.Dashboards.dashboards.find(
      (dashboard: DashboardModel) => dashboard._id === this.dashboardId,
    );
    if (!data) {
      this.$router.push('/404');
      throw new Error(`Could not find dashboard with _id ${this.dashboardId}`);
    }
    return data;
  }
}
</script>

<style scoped></style>
