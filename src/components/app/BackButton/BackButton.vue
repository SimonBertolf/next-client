<template>
  <router-link :to="to" v-slot="{ href, navigate }" custom>
    <a class="fixed left-4 top-5" :href="href" @click="navigate">
      <a-icon type="left" />
    </a>
  </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BackButton extends Vue {
  @Prop(String) to: string;
}
</script>

<style scoped></style>
