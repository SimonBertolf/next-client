<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <div v-for="filter in filters" :key="filter.key">
      {{ filter.key }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class Filters extends Vue {
  get filters() {
    return this.$store.state.Dashboards.filters;
  }
}
</script>

<style scoped></style>
