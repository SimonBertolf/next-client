<template>
  <a-range-picker v-model="selected" format="DD.MM.YYYY" separator="–" :placeholder="['from', 'to']" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import moment, { Moment } from 'moment';
import { DateRangeFilter } from '@/types';

@Component({ components: {} })
export default class DateRange extends Vue {
  name = 'DateRange';

  selected: Moment[] = [];

  @Prop({ required: true, type: Object }) readonly filter: DateRangeFilter;

  setSelected() {
    if (this.filter.selected?.from && this.filter.selected?.to) {
      const { from, to } = this.filter.selected;
      this.selected.push(moment(from));
      this.selected.push(moment(to));
    }
  }

  // watch filter selected on global store
  @Watch('filter.selected', { deep: true, immediate: true })
  onGlobalSelectedChange(
    newSelected: DateRangeFilter['selected'],
    oldSelected: DateRangeFilter['selected'] | undefined,
  ) {
    // update local selected model if items in selected list change
    if (JSON.stringify(newSelected) !== JSON.stringify(oldSelected)) {
      if (newSelected) {
        this.selected.splice(0, this.selected.length, ...[moment(newSelected.from), moment(newSelected.to)]);
      } else {
        this.selected.splice(0, this.selected.length);
      }
    }
  }

  // watch local selected model
  @Watch('selected', { deep: true, immediate: true })
  onLocalSelectedChange(newSelected: Moment[]) {
    // commit change on local selected model to store
    this.$store.commit('Dashboards/setFilterSelected', {
      key: this.filter.key,
      selected:
        newSelected?.length === 2
          ? {
              from: new Date(newSelected[0].toISOString()),
              to: new Date(newSelected[1].toISOString()),
            }
          : undefined,
    });
  }
}
</script>

<style scoped></style>
