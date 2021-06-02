<template>
  <div>
    <div class="mx-4 mb-4">
      <a-space>
        <span v-if="breakpoint">Breakpoint: {{ breakpoint }}</span>
        <span>Pages: {{ numberOfPages }}</span>
        <!-- <a-button type="primary" @click="onTestClick">
          Test Button
        </a-button> -->
      </a-space>
    </div>
    <div class="widget-layout relative" :style="{ height: `${height + 2 * rowHeight}px` }">
      <div v-if="editable" :style="{ height: `${height}px` }" :class="`layout-guides absolute left-0 top-0 w-full`">
        <div :style="{ height: `${12 - 6 + 1}px` }" class="border-b-2 border-magenta line-break"></div>
        <div
          :style="{ height: `${(rowHeight + margin) * rowsPerPage}px` }"
          v-for="n in numberOfPages - 1"
          :key="n"
          class="border-b-2 border-magenta line-break"
        />
      </div>
      <div class="layout-container absolute top-0 left-0 w-full" ref="layoutContainer">
        <grid-layout
          :layout="layout"
          :col-num="12"
          :row-height="rowHeight"
          :is-draggable="editable"
          :is-resizable="editable"
          :is-mirrored="false"
          :vertical-compact="true"
          :responsive="true"
          :prevent-collision="false"
          :margin="[margin, margin]"
          :use-css-transforms="true"
          @layout-updated="onLayoutUpdated"
          @breakpoint-changed="onBreakpointChanged"
          @layout-ready="onLayoutReady"
          ref="gridLayout"
        >
          <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
            <widget :type="item.type" :id="item.i" />
          </grid-item>
        </grid-layout>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { GridLayout, GridItem, GridBreakpoint } from 'vue-grid-layout';
import { WidgetItems } from '@/types';
import { Widget } from './Widget';

@Component({ components: { GridLayout, GridItem, Widget } })
export default class EditableLayout extends Vue {
  @Prop({ default: false }) readonly editable: boolean;

  height = 0;

  layout: WidgetItems = [];

  numberOfPages = 1;

  breakpoint: GridBreakpoint | null = null;

  // onTestClick() {
  //   // eslint-disable-next-line no-console
  //   console.log('TEST BTN CLICKED');
  // }

  private readonly margin = 12;

  private readonly pageHeight = 600; // TODO: change to print page height

  private readonly rowsPerPage = 4; // TODO: change according to design specs

  get rowHeight() {
    const rowHeight = this.pageHeight / this.rowsPerPage - this.margin;
    if (rowHeight !== Math.round(rowHeight)) {
      // eslint-disable-next-line no-console
      console.warn('Row height is not a natural number of pixels. Change rowsPerPage. rowHeight =', rowHeight);
    }
    return rowHeight;
  }

  @Watch('height', { immediate: true, deep: true })
  onHeightChange() {
    const rest = this.height % this.pageHeight;
    this.numberOfPages = (this.height - rest) / this.pageHeight + 1;
  }

  get responsiveLayout() {
    return this.$store.state.Layouts.responsiveLayout;
  }

  onLayoutUpdated(newLayout: WidgetItems) {
    // console.log('LAYOUT UPDATED');
    this.$store.commit('Layouts/updateResponsiveLayout', { layout: [...newLayout], breakpoint: this.breakpoint });
    this.measureHeight();
  }

  onBreakpointChanged(newBreakpoint: GridBreakpoint) {
    this.breakpoint = newBreakpoint;
    // console.log('BREAKPOINT CHANGED: ', newBreakpoint);
    const newLayout: WidgetItems = this.responsiveLayout[newBreakpoint];
    this.layout.splice(0, this.layout.length, ...newLayout);
    this.measureHeight();
  }

  onLayoutReady() {
    // console.log('LAYOUT READY', this.breakpoint);
    this.measureHeight();
  }

  mounted() {
    // console.log('MOUNTED');
  }

  updated() {
    // console.log('UPDATED');
    // this measures the height during a drag/resize operation.
    this.measureHeight();
  }

  measureHeight() {
    this.height = parseInt((this.$refs.gridLayout as GridLayout).containerHeight(), 10);
    // console.log('MEASURED: ', this.height);
  }
}
</script>

<style>
.layout-guides {
  background: #eee;
}

.vue-grid-item.vue-grid-placeholder {
  border-radius: 8px !important;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  /* background: #ccc;
  border: 1px solid black; */
  touch-action: none;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  /* background: #cce; */
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-resizable-handle {
  bottom: 5px !important;
  right: 5px !important;
}
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}
.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
</style>
