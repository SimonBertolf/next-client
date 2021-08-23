<template>
  <tr v-bind="{ ...$attrs, ...restProps }" class="body-row" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <slot></slot>
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';

@Component
export default class BodyRow extends Vue {
  @Emit()
  mouseenter(event: unknown): unknown {
    return event;
  }

  @Emit()
  mouseleave(event: unknown): unknown {
    return event;
  }

  get restProps(): Record<string, unknown> {
    return this.$props;
  }
}
</script>

<style scoped>
.body-row > td {
  @apply border-common-200 px-2 py-2 text-black border-b bg-transparent !important;
}
.body-row:hover > td {
  @apply bg-common-300 !important;
}
</style>
