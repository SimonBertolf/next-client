/* eslint-disable max-classes-per-file */
declare module 'vue-grid-layout' {
  import Vue from 'vue';

  export class GridLayout extends Vue {
    containerHeight: () => string;
  }

  export class GridItem extends Vue {}

  export interface GridItemData {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
    moved: boolean;
  }

  export type GridBreakpoint = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';
}
