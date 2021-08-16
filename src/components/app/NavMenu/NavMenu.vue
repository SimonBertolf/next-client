<template>
  <a-menu mode="inline" class="nav-menu">
    <a-menu-item class="menu-item self-end sm:self-start">
      <nav-menu-item to="/dashboards">Dashboards</nav-menu-item>
    </a-menu-item>
    <a-menu-item class="menu-item self-end sm:self-start">
      <nav-menu-item to="/assets">Assets</nav-menu-item>
    </a-menu-item>
    <a-menu-item class="menu-item self-end sm:self-start">
      <nav-menu-item to="/reporting">Reporting</nav-menu-item>
    </a-menu-item>
    <a-menu-item class="menu-item self-end sm:self-start">
      <nav-menu-item to="/planning">Planning</nav-menu-item>
    </a-menu-item>
    <a-menu-item class="menu-item self-end sm:self-start">
      <nav-menu-item to="/admin"><a-icon type="setting" /> Admin</nav-menu-item>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { NavMenuItem } from '../NavMenuItem';

@Component({ components: { NavMenuItem } })
export default class NavMenu extends Vue {}
</script>

<style scoped>
.menu-item,
.menu-item::after,
.menu-item::before {
  @apply p-0 !important;
  @apply m-0 !important;
  @apply border-none !important;
}

li.menu-item:not(:last-child) {
  @apply mb-4 sm:mb-0 !important;
}

.nav-menu {
  @apply border-r-0 sm:border-t-2 sm:border-b-2 !important;
  @apply pl-16 sm:pl-0 !important;
  @apply sm:border-common-400 sm:divide-solid sm:divide-y-2 sm:divide-common-400 !important;
}
</style>
