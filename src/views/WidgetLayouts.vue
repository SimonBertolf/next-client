<template>
  <Card :autoSize="true" :hasTitle="false" :padding="true" class="hidden sm:flex">
    <h2 class="text-2xl mb-2">Layouts</h2>
    <p class="mb-2">TODO: List of Layouts</p>
    <ul>
      <li v-for="layout in layouts" :key="layout._id">
        <router-link :to="`/admin/layouts/${layout._id}`" v-slot="{ href, navigate }" custom>
          <button
            :href="href"
            @click="navigate"
            class="bg-primary text-neutral hover:bg-primaryl text-white font-bold py-2 px-4 rounded mt-4"
          >
            {{ layout.name }} (_id: {{ layout._id }})
          </button>
        </router-link>
      </li>
    </ul>
    <!-- TODO: remove pre after development -->
    <!-- <pre>{{ layoutJSON }}</pre> -->
  </Card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Layout, Card, BackButton } from '@/components/app';
import { Heading } from '@/components/typography';
import { ResponsiveWidgetLayoutItems } from '@/types';
import { Layout as LayoutModel } from '@/models';

@Component({ components: { Layout, Card, Heading, BackButton } })
export default class WidgetLayouts extends Vue {
  name = 'Designs';

  // TODO: remove
  get layout(): ResponsiveWidgetLayoutItems {
    return this.$store.state.Layouts.responsiveLayout;
  }

  get layouts(): LayoutModel[] {
    return this.$store.state.Layouts.layouts;
  }

  // TODO: remove
  get layoutJSON(): string {
    return JSON.stringify(this.layout, null, 2);
  }
}
</script>

<style scoped></style>
