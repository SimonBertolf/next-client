<template>
  <a-descriptions size="small" :column="column">
    <a-descriptions-item v-for="({ label, value }, index) in descriptions" :label="label" :key="index">
      {{ value }}
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import type { DescriptionType, ColumnType } from '@/types';

@Component
export default class Descriptions extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly descriptions: DescriptionType;

  @Prop({ default: () => ({ xs: 1, sm: 4, md: 5 }) }) readonly column: ColumnType;
}
</script>

<style>
.ant-descriptions {
  @apply font-primary;
}
</style>
