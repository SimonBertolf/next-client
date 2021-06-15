<template>
  <div class="analysis m-4">
    <p>{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class Analysis extends Vue {
  name = 'Analysis';
}
</script>

<style scoped></style>
