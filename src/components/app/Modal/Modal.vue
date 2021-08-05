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
  @Prop({ type: Boolean, required: true }) readonly visible: boolean;

  @Prop({ type: [String, Boolean], default: false }) readonly title: string;

  @Prop({ default: () => () => undefined }) readonly onClose: (...args: unknown[]) => void;

  @Prop({ type: [String, Boolean], default: false }) readonly okText: string;

  @Prop({ default: () => () => undefined }) readonly onOk: (...args: unknown[]) => void;

  @Prop({ default: false }) readonly confirmLoading: boolean;

  @Prop({ default: () => () => undefined }) readonly afterClose: (...args: unknown[]) => void;

  @Prop({ default: false }) readonly isDisabled: boolean;

  @Prop({ default: false }) readonly destroyOnClose: boolean;
}
</script>

<style scoped></style>
