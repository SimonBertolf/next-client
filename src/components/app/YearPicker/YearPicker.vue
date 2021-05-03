<template>
  <a-date-picker
    placeholder="select year"
    class="w-full"
    :open="open"
    :allowClear="false"
    :value="yearDate"
    mode="year"
    format="YYYY"
    @change="handleChange"
    @openChange="openChange"
    @panelChange="panelChange"
  />
</template>

<script lang="ts">
import moment, { Moment } from 'moment';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ButtonBase } from '@/components/app/ButtonBase';

@Component({ components: { ButtonBase } })
export default class YearPicker extends Vue {
  @Prop(Number) readonly year: number;

  @Prop({ default: () => () => undefined }) onChange: Function;

  open = false;

  get yearDate(): Moment {
    return moment(new Date(`01-01-${this.year}`));
  }

  openChange() {
    this.open = !this.open;
  }

  panelChange(value: Moment) {
    const year = value.year();
    this.open = false;
    this.onChange(year);
  }

  handleChange(date: Moment) {
    const year = date.year();
    this.onChange(year);
  }
}
</script>

<style scoped></style>
