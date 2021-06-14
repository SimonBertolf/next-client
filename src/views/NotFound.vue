<template>
  <Layout>
    <template v-slot:header><Heading>404 – Not Found</Heading></template>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Layout, Heading } from '@/components';

@Component({ components: { Layout, Heading } })
export default class NotFound extends Vue {}
</script>

<style scoped></style>
