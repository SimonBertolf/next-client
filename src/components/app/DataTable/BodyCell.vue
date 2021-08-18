<template>
  <td :tabindex="tabIndex" class="body-cell" v-bind="{ ...$attrs, ...restProps }">
    <slot></slot>
  </td>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HeaderCell extends Vue {
  @Prop({ type: Boolean, default: false }) editable: boolean;

  get restProps(): Record<string, unknown> {
    const { ...restProps } = this.$props;
    return restProps;
  }

  get tabIndex(): number {
    return this.editable ? 0 : -1;
  }
}
</script>

<style scoped></style>
