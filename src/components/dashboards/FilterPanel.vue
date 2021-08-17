<template>
  <div class="filter-pannel">
    <Card :autoSize="true" :hasTitle="true" :padding="true" class="hidden md:flex mt-4 filter-card">
      <template v-slot:title>
        <span class="font-primary text-xl">Filters</span>
      </template>
      <spinner :spinning="loading">
        <filter-list />
      </spinner>
    </Card>
    <filter-button @click="showFilterModal" :loading="loading" />
    <a-modal v-model="filterModalVisible" class="filter-modal" :footer="null">
      <span class="font-primary text-xl" slot="title">Filters</span>
      <filter-list />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Card, Spinner } from '@/components/app';
import FilterList from './FilterList.vue';
import FilterButton from './FilterButton.vue';

@Component({ components: { FilterList, Card, FilterButton, Spinner } })
export default class FilterPanel extends Vue {
  filterModalVisible = false;

  get loading(): boolean {
    return this.$store.state.Dashboards.loading?.dashboard;
  }

  showFilterModal(): void {
    this.filterModalVisible = true;
  }
}
</script>

<style scoped></style>
