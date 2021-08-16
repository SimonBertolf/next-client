<template>
  <p>{{ name }}</p>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class ProjectionSectionIncome extends Vue {
  name = 'ProjectionSectionIncome';
}
</script>

<style scoped></style>
