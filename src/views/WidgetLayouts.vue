<template>
  <Layout>
    <template v-slot:header>
      <BackButton to="/assets" class="sm:hidden self-start" />
      <Heading>{{ name }}</Heading>
    </template>
    <Card :autoSize="true" :hasTitle="false" :padding="true" class="hidden sm:flex">
      <h2 class="text-2xl mb-2">Designs</h2>
      <p class="mb-2">TODO: List of designs</p>
      <router-link to="/layouts/asdf1234" v-slot="{ href, navigate }" custom>
        <button
          :href="href"
          @click="navigate"
          class="bg-primary text-neutral hover:bg-primaryl text-white font-bold py-2 px-4 rounded mt-4"
        >
          Design asdf1234
        </button>
      </router-link>
      <!-- TODO: remove pre after development -->
      <pre>{{ layoutJSON }}</pre>
    </Card>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Layout, Card, BackButton } from '@/components/app';
import { Heading } from '@/components/typography';

@Component({ components: { Layout, Card, Heading, BackButton } })
export default class WidgetLayouts extends Vue {
  name = 'Designs';

  // TODO: remove
  get layout() {
    return this.$store.state.Layouts.responsiveLayout;
  }

  // TODO: remove
  get layoutJSON() {
    return JSON.stringify(this.layout, null, 2);
  }
}
</script>

<style scoped></style>
