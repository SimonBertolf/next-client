<template>
  <FlexLayout :gap="{ x: 2 }" justify="between" :grow="1">
    <div class="font-primary font-normal text-black subpixel-antialiased text-sm">{{ kpi.label }}</div>
    <div :class="clsValue">{{ formatedValue }}</div>
  </FlexLayout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FormatList } from '@/types';
import type { Kpi } from '@/models';
import { FlexLayout } from '@/components/app';

@Component({ components: { FlexLayout } })
export default class KpiItem extends Vue {
  @Prop({ type: Object as () => Kpi }) kpi: Kpi;

  get formatedValue(): string {
    const { format, value } = this.kpi;
    const { filters } = this.$options;
    if (format.includes(FormatList.PERCENT)) return filters?.percentNumber(Number(value));
    if (format.includes(FormatList.NUMBER)) return filters?.simpleNumber(Number(value));
    if (!format) return '';
    return value.toString();
  }

  get clsValue(): string {
    return 'font-primary font-bold text-black text-sm subpixel-antialiased';
  }
}
</script>

<style scoped></style>
