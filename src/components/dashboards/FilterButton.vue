<template>
  <a-button @click="onClick" shape="circle" size="large" icon="filter" class="filter-button" />
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';

@Component({ components: {} })
export default class FilterButton extends Vue {
  @Emit('click')
  onClick(): void {
    // add some action if needed
  }
}
</script>

<style scoped>
.filter-button {
  @apply w-20 h-20 z-30 shadow-md fixed bottom-8 right-8 md:hidden !important;
  @apply border-input focus:text-dark hover:text-dark active:text-dark !important;
}
</style>
