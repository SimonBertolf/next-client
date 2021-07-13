<template>
  <a-button
    @click="onToggle"
    shape="circle"
    size="large"
    :icon="itsOpen ? 'close' : 'menu'"
    class="button-toggle-mobile"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ButtonToggleMobile extends Vue {
  @Prop({ default: false })
  readonly open: boolean;

  @Prop({ default: () => undefined })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly onToggle: (...args: any[]) => any;

  get itsOpen(): boolean {
    return this.open;
  }
}
</script>

<style scoped>
.button-toggle-mobile {
  @apply w-20 h-20 shadow-md fixed bottom-8 left-8 sm:hidden !important;
  @apply border-input focus:text-dark hover:text-dark active:text-dark !important;
}
</style>
