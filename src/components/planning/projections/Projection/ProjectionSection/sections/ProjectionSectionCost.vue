<template>
  <p>{{ name }}</p>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class ProjectionSectionCost extends Vue {
  name = 'ProjectionSectionCost';
}
</script>

<style scoped></style>
