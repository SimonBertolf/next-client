<template>
  <router-link :to="to" v-slot="{ href, navigate, isActive }" custom>
    <a :class="isActive ? 'active-link' : 'inactive-link'" :href="href" @click="navigate">
      <slot></slot>
    </a>
  </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class NavMenuItem extends Vue {
  @Prop(String) readonly to: string;
}
</script>

<style scoped>
.active-link,
.active-link::after {
  @apply bg-white sm:bg-gradient-to-r from-primary-200 to-primary-100 border-0 sm:border-primary-200 !important;
  @apply sm:w-full h-full;
  @apply text-primary-200 font-primary text-xl font-normal !important;
  @apply sm:text-center sm:text-white  sm:text-xl  sm:font-light !important;
}

.inactive-link {
  @apply text-black sm:text-center text-xl sm:text-xl font-primary font-light hover:text-primary-200 !important;
  @apply sm:bg-gradient-to-r sm:hover:from-primary-200 sm:hover:to-primary-100 sm:hover:text-white !important;
  @apply border-none !important;
  @apply w-full h-full !important;
}
</style>
