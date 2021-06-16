<template>
  <p class="pt-4">{{ name }}</p>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class AssetData extends Vue {
  name = 'AssetData'
}
</script>

<style scoped></style>
