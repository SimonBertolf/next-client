<template>
  <p :class="cls">{{ text }}</p>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class WidgetText extends Vue {
  @Prop({ required: true, type: String }) readonly text: string;

  @Prop({ default: 'left', type: String }) readonly align: string;

  res = 'text-sm truncate';

  get cls() {
    if (this.align === 'right') this.res = `${this.res} text-right`;
    if (this.align === 'center') this.res = `${this.res} text-center`;
    if (this.align === 'left') this.res = `${this.res} text-left`;
    return this.res;
  }
}
</script>

<style></style>
