<template>
  <div class="filter-pannel">
    <Card :autoSize="true" :hasTitle="true" :padding="true" class="hidden md:flex mt-4 filter-card">
      <template v-slot:title>
        <span>Filters</span>
      </template>
      <filter-list />
    </Card>
    <filter-button @click="showFilterModal" />
    <a-modal title="Filters" v-model="filterModalVisible" @ok="onFilterModalOk" class="filter-modal">
      <filter-list />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Card } from '@/components/app';
import FilterList from './FilterList.vue';
import FilterButton from './FilterButton.vue';

@Component({ components: { FilterList, Card, FilterButton } })
export default class FilterPanel extends Vue {
  filterModalVisible = false;

  showFilterModal() {
    this.filterModalVisible = true;
  }

  onFilterModalOk() {
    // TODO: apply filters and fetch data
    this.filterModalVisible = false;
  }
}
</script>

<style scoped></style>
