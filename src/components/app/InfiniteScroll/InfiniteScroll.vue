<template>
  <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" :infinite-scroll-distance="distance">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class InfiniteScroll extends Vue {
  @Prop(Function) readonly load: Function;

  @Prop(Boolean) readonly disabled: boolean;

  @Prop(Number) readonly distance: number;
}
</script>

<style scoped></style>
