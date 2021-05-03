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
  @apply bg-neutral sm:bg-gradient-to-r from-start to-stop border-0 sm:border-secondary !important;
  @apply sm:w-full h-full;
  @apply text-secondary font-primary text-4xl font-normal !important;
  @apply sm:text-center sm:text-neutral  sm:text-2xl  sm:font-light !important;
}

.inactive-link {
  @apply text-dark sm:text-center text-4xl sm:text-2xl font-primary font-light hover:text-secondary !important;
  @apply sm:bg-gradient-to-r sm:hover:from-start sm:hover:to-stop sm:hover:text-neutral !important;
  @apply border-none !important;
  @apply w-full h-full !important;
}
</style>
