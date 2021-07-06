<template>
  <div class="filter-list grid -m-4">
    <filter-input v-for="filter in filters" :key="filter.key" :type="filter.type" class="m-4" />
    <filter-reset-button class="m-4" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import FilterInput from './FilterInput.vue';
import FilterResetButton from './FilterResetButton.vue';

@Component({ components: { FilterInput, FilterResetButton } })
export default class FilterList extends Vue {
  get filters() {
    return this.$store.state.Dashboards.filters;
  }
}
</script>

<style>
.filter-card .filter-list {
  @apply grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 !important;
}
.filter-modal .filter-list {
  @apply grid-cols-1 sm:grid-cols-2 !important;
}
</style>
