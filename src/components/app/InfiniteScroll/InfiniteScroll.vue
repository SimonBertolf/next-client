<template>
  <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" :infinite-scroll-distance="distance">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class InfiniteScroll extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop(Function) readonly load: (...args: any[]) => any;

  @Prop(Boolean) readonly disabled: boolean;

  @Prop(Number) readonly distance: number;
}
</script>

<style scoped></style>
