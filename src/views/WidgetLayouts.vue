<template>
  <Card :autoSize="true" :hasTitle="false" :padding="true">
    <h2 class="text-2xl mb-2">Layouts</h2>
    <p class="mb-2">TODO: List of Layouts</p>
    <div v-if="loading" class="flex h-full justify-center items-center">
      <spinner />
    </div>
    <ul v-else>
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
  </Card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Layout, Card, BackButton, Spinner } from '@/components/app';
import { Heading } from '@/components/typography';
import { Layout as LayoutModel } from '@/models';

@Component({ components: { Layout, Card, Heading, BackButton, Spinner } })
export default class WidgetLayouts extends Vue {
  name = 'Designs';

  get loading(): boolean {
    return this.$store.state.Layouts.layoutsLoading;
  }

  get layouts(): LayoutModel[] {
    return this.$store.state.Layouts.layouts;
  }
}
</script>

<style scoped></style>
