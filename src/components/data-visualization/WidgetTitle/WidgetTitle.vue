<template>
  <h3 :class="cls">{{ title }}</h3>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class WidgetTitle extends Vue {
  @Prop({ required: true, type: String }) readonly title: string;

  @Prop({ default: 'left', type: String }) readonly align: string;

  get cls() {
    const res = 'text-3xl font-bold truncate';
    if (this.align === 'right') `${res} text-right`;
    if (this.align === 'center') `${res} text-center`;
    if (this.align === 'left') `${res} text-left`;
    return res;
  }
}
</script>

<style></style>
