<template>
  <a-button
    @click="onClick"
    type="primary"
    :class="primary ? 'button-primary' : 'button-secondary'"
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
.button-primary {
  @apply bg-primary hover:bg-primaryl  border-0 border-primary !important;
}

.button-secondary {
  @apply bg-gradient-to-r from-start to-stop hover:from-startl hover:to-stopl border-0 border-secondary !important;
}
</style>
