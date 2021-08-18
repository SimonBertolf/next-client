<template>
  <h4 :class="cls">{{ title }}</h4>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class WidgetTitle extends Vue {
  @Prop({ required: true, type: String }) readonly title: string;

  @Prop({ default: 'left', type: String }) readonly align: string;

  res = 'text-3xl font-bold truncate';

  get cls() {
    if (this.align === 'right') this.res = `${this.res} text-right`;
    if (this.align === 'center') this.res = `${this.res} text-center`;
    if (this.align === 'left') this.res = `${this.res} text-left`;
    return this.res;
  }
}
</script>

<style></style>
