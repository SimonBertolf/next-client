<template>
  <a-tabs class="font-primary text-dark" :tabBarStyle="{ textAlign: 'center', fontSize: '20px' }">
    <slot></slot>
  </a-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Tabs extends Vue {
  @Prop(String) activeKey: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop(Function) onChange: (...args: any[]) => any;

  get activeKeyModel(): string {
    return this.activeKey;
  }

  set activeKeyModel(key: string) {
    this.onChange(key);
  }
}
</script>

<style>
.ant-tabs-ink-bar {
  @apply bg-primary-200;
}
.ant-tabs-tab-active,
.ant-tabs-tab:hover {
  @apply text-black !important;
}
.ant-tabs-nav-container {
  @apply text-3xl bg-white sm:bg-transparent;
}
</style>
