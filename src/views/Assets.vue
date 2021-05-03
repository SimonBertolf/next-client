<template>
  <Layout>
    <template v-slot:header><Heading>Asset Overview</Heading></template>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Heading } from '@/components/typography';
import { Layout } from '@/components/app';

@Component({
  components: {
    Layout,
    Heading,
  },
})
export default class Assets extends Vue {}
</script>

<style scoped></style>
