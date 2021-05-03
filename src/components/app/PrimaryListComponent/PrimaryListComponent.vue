<template>
  <infinite-scroll :load="handleLoad" :disabled="busy" :distance="20">
    <primary-list
      v-if="(!loading && data.length) || data.length || (!loading && !data.length)"
      :data="data"
      v-slot="{ item, index }"
    >
      <slot :item="item" :index="index"></slot>
    </primary-list>
    <div class="text-center" v-if="(loading && busy && data.length) || (loading && !data.length)">
      <a-spin>
        <a-icon slot="indicator" type="loading" style="font-size: 24px; color: #252d48;" spin />
      </a-spin>
    </div>
  </infinite-scroll>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { PrimaryList } from '../PrimaryList';
import { InfiniteScroll } from '../InfiniteScroll';
import { Skeleton } from '../Skeleton';

@Component({
  components: {
    PrimaryList,
    InfiniteScroll,
    Skeleton,
  },
})
export default class AssetList extends Vue {
  @Prop(Boolean) readonly loading: boolean;

  @Prop(Boolean) readonly busy: boolean;

  @Prop({ type: Array, default: () => [] }) readonly data: Array<unknown>;

  @Prop(Function) readonly load: Function;

  handleLoad(): void {
    if (!this.busy) this.load();
  }
}
</script>

<style scoped></style>
