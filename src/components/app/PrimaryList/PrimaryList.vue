<template>
  <a-list :data-source="data" :grid="{ gutter: 16, xs: 1 }">
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <slot :item="item" :index="index"></slot>
    </a-list-item>
  </a-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PrimaryList extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly data: Array<unknown>;
}
</script>

<style scoped></style>
