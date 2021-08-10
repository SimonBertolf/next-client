<template>
  <Card :autoSize="true" :hasTitle="false" :padding="true">
    <p>{{ name }}</p>
  </Card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Card } from '@/components/app';

@Component({ components: { Card } })
export default class AssetAttributes extends Vue {
  name = 'AssetAttributes';
}
</script>

<style scoped></style>
