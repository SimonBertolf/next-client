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
import { SubNavItem } from '@/types';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({ components: {} })
export default class SubNavMenu extends Vue {
  @Prop({ required: true, type: Array }) readonly items: SubNavItem[];

  @Prop({ type: String, default: '' }) readonly selectedId!: string;

  @Prop({ type: String, default: '/' }) readonly basePath: string;

  current: string[] = [this.selectedId];

  @Watch('selectedId', { immediate: true, deep: true })
  onNewWidgetChange(newselectedId: string): void {
    this.current = [newselectedId];
  }

  @Watch('items', { immediate: true, deep: true })
  onItemsChange(): void {
    const currentIndex = this.items.findIndex((item) => this.$route.path.includes(item._id));
    if (currentIndex === -1) {
      this.current = [];
    } else {
      this.current = [this.items[currentIndex]._id];
    }
  }
}
</script>

<style scoped></style>
