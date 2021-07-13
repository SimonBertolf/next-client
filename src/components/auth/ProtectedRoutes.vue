<template>
  <div>
    <div v-if="isAuthenticated">
      <router-view></router-view>
    </div>
    <div v-if="isLoading" class="text-center mt-8">
      <spinner />
    </div>
    <div v-if="!hasUser && !isLoading">
      <h1>401 Unauthorized</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Spinner } from '@/components/app';

@Component({ components: { Spinner } })
export default class ProtectedRoutes extends Vue {
  get isAuthenticated() {
    return this.hasUser && !this.isLoading;
  }

  get hasUser() {
    return !!this.$store.state.Auth.user;
  }

  get isLoading() {
    return this.$store.state.Auth.loading;
  }
}
</script>

<style></style>
