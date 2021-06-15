<template>
  <div v-if="$store.state.Auth.user">
    <router-view></router-view>
  </div>
  <div v-else>
    <h1>401 Unauthorized</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ProtectedRoutes extends Vue {}
</script>

<style></style>
