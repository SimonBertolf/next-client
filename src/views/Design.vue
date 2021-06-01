<template>
  <Layout>
    <template v-slot:header>
      <BackButton to="/assets" class="sm:hidden self-start" />
      <Heading>Design {{ designId }}</Heading>
    </template>
    <widget-editor />
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Layout, BackButton } from '@/components/app';
import { Heading } from '@/components/typography';
import { WidgetEditor } from '@/components/reporting';

@Component({ components: { Layout, Heading, BackButton, WidgetEditor } })
export default class Design extends Vue {
  @Prop(String) readonly designId: string;
}
</script>

<style></style>
