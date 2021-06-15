<template>
  <a-menu v-model="current" mode="horizontal">
    <a-menu-item v-for="item in this.items" :key="item._id">
      <router-link :to="`${basePath}/${item._id}`">
        {{ item.name }}
      </router-link>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({ components: {} })
export default class SubNavMenu extends Vue {
  @Prop({ required: true }) readonly items: { _id: string; name: string }[];

  @Prop(String) readonly subItemId: string;

  @Prop({ required: true, type: String }) readonly basePath: string;

  current: string[] = [this.subItemId];

  @Watch('subItemId', { immediate: true, deep: true })
  onNewWidgetChange(newsubItemId: string) {
    this.current = [newsubItemId];
  }
}
</script>

<style scoped></style>
