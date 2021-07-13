<template>
  <Layout>
    <template v-slot:header><Heading>Assets</Heading></template>
    <ul>
      <li v-for="asset in assets" :key="asset.id">
        <router-link :to="`/assets/${asset.id}`" v-slot="{ href, navigate }" custom>
          <button
            :href="href"
            @click="navigate"
            class="bg-primary text-neutral hover:bg-primaryl text-white font-bold py-2 px-4 rounded mt-4"
          >
            {{ asset.name }} (id: {{ asset.id }})
          </button>
        </router-link>
      </li>
    </ul>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Heading } from '@/components/typography';
import { Layout } from '@/components/app';
import { Asset } from '@/models';

@Component({
  components: {
    Layout,
    Heading,
  },
})
export default class Assets extends Vue {
  get assets(): Asset {
    return this.$store.state.Assets.assets;
  }
}
</script>

<style scoped></style>
