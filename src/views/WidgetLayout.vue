<template>
  <Layout>
    <template v-slot:header>
      <BackButton to="/assets" class="sm:hidden self-start" />
      <Heading>Design {{ layoutId }}</Heading>
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
export default class WidgetLayout extends Vue {
  @Prop(String) readonly layoutId: string;
}
</script>

<style></style>
