<template>
  <h4 :class="classNames">{{ title }}</h4>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class WidgetTitle extends Vue {
  @Prop({ required: true, type: String }) readonly title: string;

  @Prop({ default: 'left', type: String }) readonly align: string;

  baseClassNames = 'text-xl font-bold truncate';

  get classNames(): string {
    if (this.align === 'right') return `${this.baseClassNames} text-right`;
    if (this.align === 'center') return `${this.baseClassNames} text-center`;
    if (this.align === 'left') return `${this.baseClassNames} text-left`;
    return this.baseClassNames;
  }
}
</script>

<style></style>
