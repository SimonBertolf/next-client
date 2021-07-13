<template>
  <a-spin>
    <a-icon slot="indicator" type="loading" style="font-size: 24px; color: #252d48;" spin />
  </a-spin>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class Spinner extends Vue {
  name = 'Spinner';
}
</script>

<style scoped></style>
