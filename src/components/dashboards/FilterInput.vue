<template>
  <component :is="type" :filter="filter" :filterIndex="filterIndex" :filter-selection="filterSelection" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Filter, FilterSelection } from '@/types';
import { DateRange, Select } from './filters';

@Component({ components: { DateRange, Select } })
export default class FilterInput extends Vue {
  name = 'Filter';

  @Prop({ required: true, type: String }) readonly type: Filter['type'];

  @Prop({ required: true, type: Number }) readonly filterIndex: number;

  get filterSelection(): FilterSelection {
    return this.$store.state.Dashboards.filterSelections[this.filterIndex];
  }

  // @Prop({ required: true, type: String }) readonly key: string;

  get filter(): Filter | undefined {
    const { filters }: { filters: Filter[] } = this.$store.state.Dashboards;
    const filter = filters.find((item) => this.$vnode.key === item.key);
    if (!filter) {
      this.$store.commit(
        'Errors/setError',
        new Error(`Could not find filter ${this.$vnode.key?.toString()} in Dashboards store.`),
        { root: true },
      );
    }
    return filter;
  }
}
</script>

<style scoped></style>
