<template>
  <a-range-picker v-model="selected" format="DD.MM.YYYY" separator="–" :placeholder="['from', 'to']" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import moment, { Moment } from 'moment';
import { DateRangeFilter, FilterSelection } from '@/types';

@Component({ components: {} })
export default class DateRange extends Vue {
  name = 'DateRange';

  selected: Moment[] = [];

  @Prop({ required: true, type: Object }) readonly filter: DateRangeFilter;

  @Prop({ required: true, type: Number }) readonly filterIndex: number;

  @Prop({ required: true, type: Array }) readonly filterSelection: FilterSelection;

  // watch filter selected on global store
  @Watch('filterSelection', { deep: true, immediate: true })
  onGlobalSelectedChange() {
    if (JSON.stringify(this.selected) !== JSON.stringify(this.filterSelection)) {
      if (this.filterSelection.length === 2) {
        this.selected.splice(0, this.selected.length, ...this.filterSelection.map((item) => moment(item)));
      } else {
        this.selected.splice(0, this.selected.length);
      }
    }
  }

  // watch local selected model
  @Watch('selected', { deep: true, immediate: true })
  onLocalSelectedChange() {
    // update global selected if different from local
    if (JSON.stringify(this.selected) !== JSON.stringify(this.filterSelection)) {
      const selectedUpdate = this.selected.map((item) => item.toISOString());
      this.$store.commit('Dashboards/setFilterSelection', {
        key: this.filter.key,
        selection: this.selected?.length === 2 ? [...selectedUpdate] : [],
      });
    }
  }
}
</script>

<style scoped></style>
