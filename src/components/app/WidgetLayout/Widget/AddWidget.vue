<template>
  <p>{{ name }}</p>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class AddWidget extends Vue {
  name = 'AddWidget';
}
</script>

<style scoped></style>
