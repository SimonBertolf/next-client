<template>
  <Layout>
    <template v-slot:header
      ><Heading>{{ name }}</Heading>
    </template>
    <div class="mx-4 md:mx-0">
      <Card :autoSize="true" :hasTitle="false" :padding="true">
        <sub-nav-menu :items="items" base-path="/admin" />
      </Card>
      <div class="mt-4">
        <router-view></router-view>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Layout, Heading, SubNavMenu, Card } from '@/components';

@Component({ components: { Layout, Heading, SubNavMenu, Card } })
export default class Admin extends Vue {
  name = 'Admin';

  selectedId = '';

  items = [
    {
      _id: 'layouts',
      name: 'Layouts',
    },
  ];
}
</script>

<style scoped></style>
