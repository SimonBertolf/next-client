<template>
  <a-button class="custom-button" type="ghost" block @click="onAction">
    <a-icon type="edit" />
  </a-button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TableActionButton extends Vue {
  @Prop({ type: Function, default: () => () => undefined }) onAction: Function;
}
</script>

<style>
[ant-click-animating-without-extra-node='true']::after,
.ant-click-animating-node::after,
.ant-click-animating-node {
  @apply shadow-none hidden !important;
}

.custom-button {
  border-color: #dbdbdb;
  @apply text-dark hover:text-dark focus:text-dark active:text-dark !important;
  @apply border-0 shadow-none px-1 ring-0 transition-none h-full !important;
}
</style>
