<template>
  <p>{{ name }}</p>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class ProjectionSectionEquity extends Vue {
  name = 'ProjectionSectionEquity';
}
</script>

<style scoped></style>
