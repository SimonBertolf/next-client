<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  @Watch('$store.state.Errors.error', { deep: true, immediate: true })
  onErrorChange(val: Error, oldVal: Error | null): void {
    // eslint-disable-next-line no-console
    if (val) console.error(val);
    if (oldVal) {
      if (val.message !== oldVal?.message) {
        this.$message.error(val.message);
        return;
      }
    }
    if (val) this.$message.error(val.message);
  }
}
</script>

<style></style>
