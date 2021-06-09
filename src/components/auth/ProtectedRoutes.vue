<template>
  <div v-if="isNotAuthenticated" class="text-center mt-8">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 24px; color: #252d48;" spin />
    </a-spin>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ProtectedRoutes extends Vue {
  get isNotAuthenticated() {
    // TODO: replace mock, build logic
    return false;
  }

  get user() {
    return this.$store.state.Auth.user;
  }

  get loading() {
    return this.$store.state.Auth.loading;
  }
}
</script>

<style></style>
