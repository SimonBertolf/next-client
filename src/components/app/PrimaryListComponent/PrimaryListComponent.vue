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
      <spinner />
    </div>
  </infinite-scroll>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { PrimaryList } from '../PrimaryList';
import { InfiniteScroll } from '../InfiniteScroll';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';

@Component({
  components: {
    PrimaryList,
    InfiniteScroll,
    Skeleton,
    Spinner,
  },
})
export default class AssetList extends Vue {
  @Prop(Boolean) readonly loading: boolean;

  @Prop(Boolean) readonly busy: boolean;

  @Prop({ type: Array, default: () => [] }) readonly data: Array<unknown>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop(Function) readonly load: (...args: any[]) => any;

  handleLoad(): void {
    if (!this.busy) this.load();
  }
}
</script>

<style scoped></style>
