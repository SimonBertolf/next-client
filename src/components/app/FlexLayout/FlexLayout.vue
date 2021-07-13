<template>
  <div :class="cls" :style="customStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class FlexLayout extends Vue {
  @Prop({ default: false }) column: boolean;

  @Prop({ default: false }) reverse: boolean | { sm?: boolean; md?: boolean; lg?: boolean };

  @Prop({ default: true }) wrap: boolean;

  @Prop({ default: undefined }) gap?: number | { x?: number; y?: number };

  @Prop({ default: undefined }) justify?: string;

  @Prop({ default: undefined }) align?: string;

  @Prop({ default: undefined }) grow?: number;

  get cls(): string {
    let cls = 'flex';

    let itsReverse = '';
    if (this.reverse === true) {
      itsReverse = '-reverse';
    }

    const mediaReverse = [];
    const notReverse = [];
    if (typeof this.reverse !== 'boolean') {
      const { sm, md, lg } = this.reverse;
      if (sm) mediaReverse.push('sm:');
      if (sm === false) notReverse.push('sm:');
      if (md) mediaReverse.push('md:');
      if (md === false) notReverse.push('md:');
      if (lg) mediaReverse.push('lg:');
      if (lg === false) notReverse.push('lg:');
    }

    if (this.column) {
      cls = `${cls} flex-col${itsReverse}`;
      mediaReverse.forEach((reverse) => {
        cls = `${cls} ${reverse}flex-col-reverse`;
      });
      notReverse.forEach((noReverse) => {
        cls = `${cls} ${noReverse}flex-col`;
      });
    } else {
      cls = `${cls} flex-row${itsReverse}`;
      mediaReverse.forEach((reverse) => {
        cls = `${cls} ${reverse}flex-row-reverse`;
      });
      notReverse.forEach((noReverse) => {
        cls = `${cls} ${noReverse}flex-row`;
      });
    }
    if (this.wrap) cls = `${cls} flex-wrap`;
    if (this.gap) {
      if (Number.isInteger(this.gap)) {
        cls = `${cls} gap-${this.gap}`;
      } else {
        const { x, y } = this.gap as { x?: number; y?: number };
        if (x) cls = `${cls} gap-x-${x}`;
        if (y) cls = `${cls} gap-y-${y}`;
      }
    }
    if (this.justify) cls = `${cls} justify-${this.justify}`;
    if (this.align) cls = `${cls} items-${this.align}`;
    return cls;
  }

  get customStyle(): undefined | string {
    if (this.grow) return `flex-grow: ${this.grow};`;
    return undefined;
  }
}
</script>

<style scoped></style>
