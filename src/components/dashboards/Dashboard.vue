<template>
  <div class="dashboard m-4">
    <p>
      Hier kommt das
      <span class="font-bold">{{ dashboardName }}</span>
      Dashboard (_id: {{ dashboardId }})
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class Dashboard extends Vue {
  @Prop({ required: true, type: String }) readonly dashboardId: string;

  get dashboardName() {
    return this.$store.state.Dashboards.dashboards.find((dashboard) => dashboard._id === this.dashboardId)?.name;
  }
}
</script>

<style scoped></style>
