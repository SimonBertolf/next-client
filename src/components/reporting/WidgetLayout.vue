<template>
  <div class="widget-layout relative" :style="{ height: `${height + 2 * rowHeight}px` }">
    <div v-if="editable" :style="{ height: `${height}px` }" :class="`layout-guides absolute left-0 top-0 w-full`">
      <div :style="{ height: `${12 - 6 + 1}px` }" class="border-b-2 border-magenta line-break"></div>
      <div
        :style="{ height: `${(rowHeight + margin) * rowsPerPage}px` }"
        v-for="n in numberOfPages"
        :key="n"
        class="border-b-2 border-magenta line-break"
      />
    </div>
    <div class="layout-container absolute top-0 left-0 w-full" ref="layoutContainer">
      <grid-layout
        :layout.sync="layout"
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
      >
        <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
          <widget :type="item.type" :id="item.i" />
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { GridLayout, GridItem, GridItemData } from 'vue-grid-layout';
import { WidgetItem } from '@/types';
import { Widget } from './Widget';

@Component({ components: { GridLayout, GridItem, Widget } })
export default class EditableLayout extends Vue {
  @Prop({ default: false }) readonly editable: boolean;

  height = 0;

  numberOfPages = 1;

  private readonly margin = 12;

  private readonly pageHeight = 600; // TODO: change to print page height

  private readonly rowsPerPage = 4; // TODO: change according to design specs

  get rowHeight() {
    const rowHeight = this.pageHeight / this.rowsPerPage - this.margin;
    if (rowHeight !== Math.round(rowHeight)) {
      // eslint-disable-next-line no-console
      console.warn('Row height is not an exact pixel number. Change rowsPerPage. rowHeight =', rowHeight);
    }
    return rowHeight;
  }

  @Watch('height', { immediate: true, deep: true })
  onHeightChange() {
    const rest = this.height % this.pageHeight;
    this.numberOfPages = (this.height - rest) / this.pageHeight;
  }

  layout: WidgetItem[] = [
    {
      x: 0,
      y: 0,
      w: 2,
      h: 1,
      i: '0',
      type: 'WidgetA',
    },
    {
      x: 2,
      y: 0,
      w: 2,
      h: 1,
      i: '1',
      type: 'WidgetB',
    },
    {
      x: 6,
      y: 3,
      w: 2,
      h: 5,
      i: '2',
      type: 'WidgetC',
    },
    {
      x: 6,
      y: 0,
      w: 2,
      h: 3,
      i: '3',
      type: 'WidgetA',
    },
    {
      x: 4,
      y: 0,
      w: 2,
      h: 3,
      i: '4',
      type: 'WidgetA',
    },
    {
      x: 10,
      y: 0,
      w: 2,
      h: 3,
      i: '5',
      type: 'WidgetC',
    },
    {
      x: 0,
      y: 1,
      w: 2,
      h: 5,
      i: '6',
      type: 'WidgetB',
    },
  ];

  onLayoutUpdated = (newLayout: GridItemData[]) => {
    // eslint-disable-next-line no-console
    console.log('newLayout: ', JSON.stringify(newLayout, null, 2));
  };

  mounted() {
    this.measureHeight();
  }

  updated() {
    this.measureHeight();
  }

  measureHeight() {
    this.height = (this.$refs.layoutContainer as Element).clientHeight;
    // console.log('this.height: ', this.height);
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
