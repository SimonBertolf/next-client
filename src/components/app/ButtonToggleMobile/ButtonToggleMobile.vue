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

  @Prop({ default: () => () => undefined })
  readonly onToggle: (...args: unknown[]) => unknown;

  get itsOpen(): boolean {
    return this.open;
  }
}
</script>

<style scoped>
.button-toggle-mobile {
  @apply w-20 h-20 shadow-md fixed bottom-8 left-8 sm:hidden !important;
  @apply border-common-200 focus:text-black hover:text-black active:text-black !important;
}
</style>
