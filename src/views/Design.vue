<template>
  <Layout>
    <template v-slot:header>
      <BackButton to="/assets" class="sm:hidden self-start" />
      <Heading>Designs</Heading>
    </template>
    <Card :autoSize="true" :hasTitle="false" :padding="true" class="hidden sm:flex">
      <h2 class="text-2xl mb-2">Design {{ designId }}</h2>
      <a-space class="mb-4"> Editable: <a-switch default-checked v-model="editable" /> </a-space>
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="editable"
        :is-resizable="editable"
        :is-mirrored="false"
        :vertical-compact="true"
        :responsive="true"
        :prevent-collision="false"
        :margin="[5, 5]"
        :use-css-transforms="true"
        @layout-updated="onLayoutUpdated"
      >
        <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
          <span class="text">{{ item.i }}</span>
        </grid-item>
      </grid-layout>
    </Card>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { GridLayout, GridItem, GridItemData } from 'vue-grid-layout';
import { Layout, Card, BackButton } from '@/components/app';
import { Heading } from '@/components/typography';

@Component({ components: { Layout, Card, Heading, BackButton, GridLayout, GridItem } })
export default class Design extends Vue {
  @Prop(String) readonly designId: string;

  editable = true;

  onLayoutUpdated = (newLayout: GridItemData[]) => {
    // eslint-disable-next-line no-console
    console.log('newLayout: ', JSON.stringify(newLayout, null, 2));
  };

  layout: GridItemData[] = [
    {
      x: 0,
      y: 0,
      w: 2,
      h: 1,
      i: '0',
    },
    {
      x: 2,
      y: 0,
      w: 2,
      h: 1,
      i: '1',
    },
    {
      x: 6,
      y: 3,
      w: 2,
      h: 5,
      i: '2',
    },
    {
      x: 6,
      y: 0,
      w: 2,
      h: 3,
      i: '3',
    },
    {
      x: 4,
      y: 0,
      w: 2,
      h: 3,
      i: '4',
    },
    {
      x: 10,
      y: 0,
      w: 2,
      h: 3,
      i: '5',
    },
    {
      x: 0,
      y: 1,
      w: 2,
      h: 5,
      i: '6',
    },
  ];
}
</script>

<style scoped>
.vue-grid-layout {
  background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
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
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  /* background: url("data:image/svg+xml;utf8,
  <svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat; */
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
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
