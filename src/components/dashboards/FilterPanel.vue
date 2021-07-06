<template>
  <div class="filter-pannel">
    <Card :autoSize="true" :hasTitle="false" :padding="true" class="hidden md:flex mt-4">
      <filters />
    </Card>
    <filter-button @click="showFilterModal" />
    <a-modal title="Filters" v-model="filterModalVisible" @ok="onFilterModalOk">
      <filters />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Card } from '@/components/app';
import Filters from './Filters.vue';
import FilterButton from './FilterButton.vue';

@Component({ components: { Filters, Card, FilterButton } })
export default class FilterPanel extends Vue {
  name = 'FilterPanel';

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
