<template>
  <p>{{ name }}</p>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class ProjectionSectionSale extends Vue {
  name = 'ProjectionSectionSale';
}
</script>

<style scoped></style>
