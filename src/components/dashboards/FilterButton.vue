<template>
  <a-button @click="onClick" shape="circle" size="large" icon="filter" class="filter-button" :loading="loading" />
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class FilterButton extends Vue {
  @Prop({ type: Boolean, default: false }) readonly loading: boolean;

  @Emit('click')
  onClick(): void {
    // add some action if needed
  }
}
</script>

<style scoped>
.filter-button {
  @apply w-20 h-20 z-30 shadow-md fixed bottom-8 right-8 md:hidden !important;
  @apply border-common-200 focus:text-black hover:text-black active:text-black !important;
}
</style>
