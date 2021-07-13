<template>
  <a-modal
    :visible="visible"
    :title="title"
    centered
    @cancel="onClose"
    :ok-text="okText"
    @ok="onOk"
    :confirm-loading="confirmLoading"
    :after-close="afterClose"
    :ok-button-props="{ props: { disabled: isDisabled } }"
    :destroyOnClose="destroyOnClose"
  >
    <slot></slot>
  </a-modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Prop(Boolean) readonly visible: boolean;

  @Prop(String) readonly title: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ default: () => () => undefined }) readonly onClose: (...args: any[]) => any;

  @Prop(String) readonly okText: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ default: () => () => undefined }) readonly onOk: (...args: any[]) => any;

  @Prop({ default: false }) readonly confirmLoading: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ default: () => () => undefined }) readonly afterClose: (...args: any[]) => any;

  @Prop({ default: false }) readonly isDisabled: boolean;

  @Prop({ default: false }) readonly destroyOnClose: boolean;
}
</script>

<style scoped></style>
