<template>
  <p>{{ name }}</p>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class ReportPrint extends Vue {
  name = 'ReportPrint';
}
</script>

<style scoped></style>
