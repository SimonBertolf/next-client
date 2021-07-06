<template>
  <a-range-picker />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { DateRangeFilter } from '@/types';

@Component({ components: {} })
export default class DateRange extends Vue {
  name = 'DateRange';

  @Prop({ required: true, type: Object }) readonly filter: DateRangeFilter;

  //  TODO: update global state
  // onChange(val: any, val2: string) {
  //   console.log('val: ', val2);
  //   console.log('Date(moment): ', new Date(val[0]).toISOString());
  // }
}
</script>

<style scoped></style>
