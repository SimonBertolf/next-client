<template>
  <Layout>
    <template v-slot:header>
      <BackButton to="/assets" class="sm:hidden self-start" />
      <Heading>Designs</Heading>
    </template>
    <Card :autoSize="true" :hasTitle="false" :padding="true" class="hidden sm:flex">
      <h2 class="text-2xl mb-2">Design {{ designId }}</h2>
      <p>TODO: vue grid layout here</p>
    </Card>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Layout, Card, BackButton } from '@/components/app';
import { Heading } from '@/components/typography';

@Component({ components: { Layout, Card, Heading, BackButton } })
export default class Design extends Vue {
  @Prop(String) readonly designId: string;
}
</script>

<style></style>
