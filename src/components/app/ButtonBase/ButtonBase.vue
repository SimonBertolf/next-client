<template>
  <a-button
    @click="onClick"
    type="primary"
    :class="primary ? 'button-base-primary' : 'button-base-secondary'"
    :htmlType="type"
    :icon="icon"
    :size="size"
    :shape="shape"
    ><slot></slot
  ></a-button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ButtonBase extends Vue {
  @Prop({ default: (): boolean => false }) readonly primary: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ default: () => () => undefined }) readonly onClick!: (...args: any[]) => any;

  @Prop({ default: (): null => null }) readonly icon: string | null;

  @Prop({ default: (): string => 'default' }) readonly size: string;

  @Prop({ default: (): string => 'button' }) readonly type: string;

  @Prop({ default: (): string | null => null }) readonly shape: string;
}
</script>

<style scoped>
.button-base-secondary {
  @apply bg-secondary-100 hover:bg-secondary-200  border-0 border-secondary-100 !important;
}

.button-base-primary {
  @apply bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-300 hover:to-primary-400 border-0 border-primary-100 !important;
}
</style>
