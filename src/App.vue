<template>
  <div>
    <span v-if="loading">loading...</span>
    <span v-if="user === null && !loading">Not authenticated</span>
    <router-view v-if="user"></router-view>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  get user() {
    return this.$store.state.Auth.user;
  }

  get loading() {
    return this.$store.state.Auth.loading;
  }

  @Watch('$store.state.Errors.error', { deep: true, immediate: true })
  onErrorChange(val: Error, oldVal: Error | null) {
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
