<template>
  <Layout>
    <template v-slot:header>
      <Heading>{{ name }}</Heading>
    </template>
    <div class="mx-4 md:mx-0">
      <Card :autoSize="true" :hasTitle="false" :padding="true">
        <sub-nav-menu :items="items" base-path="/reporting" />
      </Card>
      <router-view></router-view>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Layout, Heading, SubNavMenu, Card } from '@/components';

@Component({ components: { Layout, Heading, SubNavMenu, Card } })
export default class Reporting extends Vue {
  name = 'Reporting';

  items = [
    {
      _id: 'reports',
      name: 'Reports',
    },
    {
      _id: 'analysis',
      name: 'Analysis',
    },
  ];
}
</script>

<style scoped></style>
