<template>
  <a-layout class="h-screen bg-background root-layout">
    <span class="md:hidden"><Overlay :show="!collapsed" :onClose="handleCollapse" /></span>
    <a-layout-sider
      :class="layoutSliderCls"
      v-model="collapsed"
      :trigger="null"
      breakpoint="md"
      collapsed-width="0"
      collapsible
    >
      <div class="flex flex-col h-full">
        <div class="flex-grow sm:flex-grow-0 sm:block sm:h-12 m-4" />
        <nav-menu></nav-menu>
        <ButtonToggleMobile class="sm:hidden" :open="!collapsed" :onToggle="handleCollapse" />
        <div class="w-full h-36" />
      </div>
    </a-layout-sider>
    <ButtonToggle class="hidden sm:flex" :open="!collapsed" :onToggle="handleCollapse" />
    <a-layout class="bg-background">
      <a-layout class="container mx-auto p-0 sm:p-4 bg-background">
        <a-layout-header class="layout-header">
          <slot name="header"></slot>
        </a-layout-header>
        <a-layout-content class="bg-background">
          <div class="sm:hidden h-20" />
          <slot></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ButtonToggle } from '../ButtonToggle';
import { ButtonToggleMobile } from '../ButtonToggleMobile';
import { Overlay } from '../Overlay';
import { NavMenu } from '../NavMenu';

@Component({
  components: {
    Overlay,
    ButtonToggle,
    ButtonToggleMobile,
    NavMenu,
  },
})
export default class Layout extends Vue {
  collapsed = false;

  handleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  get layoutSliderCls(): string {
    const cls = 'a-layout-slider';
    if (this.collapsed) {
      return `${cls} a-layout-slider-closed`;
    }
    return `${cls} a-layout-slider-open`;
  }
}
</script>

<style scoped>
.root-layout {
  @apply flex-col sm:flex-row justify-end sm:justify-start !important;
}

.a-layout-slider {
  @apply bg-neutral z-30 shadow-md fixed md:static;
}

.a-layout-slider-open {
  height: calc(100vh - 4.5rem);
  min-height: calc(100vh - 4.5rem);
  @apply w-screen sm:w-auto sm:h-screen max-w-full !important;
}

.a-layout-slider-closed {
  height: calc(100vh - 4.5rem);
  min-height: calc(100vh - 4.5rem);
  @apply max-w-0 min-w-0 w-0 sm:h-screen !important;
}

.layout-header {
  @apply bg-neutral sm:bg-background mb-2 shadow sm:shadow-none sm:mb-0 p-0 leading-normal sm:h-auto;
  @apply flex justify-center items-center w-full px-4 md:px-0 mb-0 sm:mb-4 fixed sm:static z-10;
}
</style>
