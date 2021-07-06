<template>
  <component :is="type" :filter="filter" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Filter as FilterType } from '@/types';
import { DateRange, Select } from './filters';

@Component({ components: { DateRange, Select } })
export default class FilterInput extends Vue {
  name = 'Filter';

  @Prop({ required: true, type: String }) readonly type: FilterType['type'];

  // @Prop({ required: true, type: String }) readonly key: string;

  get filter(): FilterType | undefined {
    return this.$store.state.Dashboards.filters.find((filter: FilterType) => this.$vnode.key === filter.key);
  }
}
</script>

<style scoped></style>
