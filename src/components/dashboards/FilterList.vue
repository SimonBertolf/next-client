<template>
  <div class="filter-list grid -m-4">
    <filter-input
      v-for="(filter, index) in filters"
      :key="filter.key"
      :type="filter.type"
      :filterIndex="index"
      class="m-4"
    />
    <filter-reset-button class="m-4" />
  </div>
</template>

<script lang="ts">
import { Filter } from '@/types';
import { Vue, Component } from 'vue-property-decorator';
import FilterInput from './FilterInput.vue';
import FilterResetButton from './FilterResetButton.vue';

@Component({ components: { FilterInput, FilterResetButton } })
export default class FilterList extends Vue {
  get filters(): Filter[] {
    return this.$store.state.Dashboards.filters;
  }
}
</script>

<style>
.filter-card .filter-list {
  @apply grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 !important;
}
.filter-modal .filter-list {
  @apply grid-cols-1 sm:grid-cols-2 !important;
}
</style>
