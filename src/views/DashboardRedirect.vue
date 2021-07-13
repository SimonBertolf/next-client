<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class DashboardRedirect extends Vue {
  get firstDashboardId(): string {
    // TODO: what if no dashboards?
    return this.$store.state.Dashboards.dashboards[0]?._id;
  }

  mounted(): void {
    this.$router.push(`/dashboards/${this.firstDashboardId}`);
  }
}
</script>

<style scoped></style>
