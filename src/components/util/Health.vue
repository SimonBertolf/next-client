<template>
  <div>
    <h1 class="text-xl mb-2">I'am good. Thanks for asking.</h1>
    <p>NODE_ENV = {{ nodeEnv }}, OPS_ENV = {{ opsEnv }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class Design extends Vue {
  nodeEnv = process.env.NODE_ENV;

  opsEnv = process.env.VUE_APP_OPS_ENV || 'local';
}
</script>

<style></style>
