<template>
  <tr v-bind="{ ...$attrs, ...restProps }" class="body-row">
    <slot></slot>
  </tr>
</template>

<script lang="ts">
// TODO: remove all any's and following comment!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class BodyRow extends Vue {
  get restProps(): Record<string, unknown> {
    return this.$props;
  }
}
</script>

<style scoped>
.body-row > td {
  border-color: #cbcbcb;
  @apply font-primary px-2 py-2 text-dark border-b bg-transparent !important;
}
.body-row:hover > td:not(.body-cell-action) {
  background-color: #f0f0f0 !important;
}
</style>
