<template>
  <p>{{ name }}</p>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class ProjectionSectionFunding extends Vue {
  name = 'ProjectionSectionFunding';
}
</script>

<style scoped></style>
