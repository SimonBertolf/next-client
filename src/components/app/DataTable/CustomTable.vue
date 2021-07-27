<template>
  <table ref="dataTable" v-bind="{ ...$attrs, ...restProps }">
    <slot></slot>
  </table>
</template>

<script lang="ts">
// TODO: remove all any's and following comment!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CustomTable extends Vue {
  $refs!: {
    dataTable: HTMLTableElement;
  };

  mounted(): void {
    const table = this.$refs.dataTable;
    if (table.classList.value.includes('ant-table-fixed')) {
      table.parentElement?.classList.add('custom-table-scrollbar');
    }
  }

  get restProps(): Record<string, unknown> {
    return this.$props;
  }
}
</script>

<style>
.custom-table-scrollbar {
  @apply overflow-hidden !important;
}
.custom-table-scrollbar:hover {
  @apply overflow-scroll scrollbar-thin scrollbar-thumb-thumb scrollbar-track-transparent !important;
}
</style>
