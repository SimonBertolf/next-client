<template>
  <a-range-picker v-model="selected" format="DD.MM.YYYY" separator="–" :placeholder="['from', 'to']" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
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

  mounted() {
    this.setSelected();
  }

  // TODO: update state of Dashboards.filters
  // @Watch('selected', { deep: true, immediate: true })
  // onSelectedChange(newVal: string[], oldVal: string[]) {
  //   console.log('old: ', oldVal);
  //   console.log('new: ', newVal);
  // }
}
</script>

<style scoped></style>
