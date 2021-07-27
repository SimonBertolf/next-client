<template>
  <div class="flex h-full justify-center items-center mt-4">
    <spinner />
  </div>
</template>

<script lang="ts">
import { Dashboard } from '@/models';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Spinner } from '@/components/app';

@Component({ components: { Spinner } })
export default class DashboardRedirect extends Vue {
  get dashboards(): Dashboard[] {
    return this.$store.state.Dashboards.dashboards;
  }

  @Watch('dashboards', { immediate: true, deep: true })
  onDashboardsChange(newDashboards: Dashboard[]): void {
    if (newDashboards.length) {
      this.$router.push(`/dashboards/${newDashboards[0]._id}`);
    }
  }
}
</script>

<style scoped></style>
