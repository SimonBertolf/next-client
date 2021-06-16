<template>
  <div class="reports m-4">
    <p>{{ name }}</p>
    <ul>
      <li v-for="report in reports" :key="report._id">
        <router-link :to="`/reporting/reports/${report._id}`" v-slot="{ href, navigate }" custom>
          <button
            :href="href"
            @click="navigate"
            class="bg-primary text-neutral hover:bg-primaryl text-white font-bold py-2 px-4 rounded mt-4"
          >
            {{ report.name }} (_id: {{ report._id }})
          </button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Report } from '@/models';

@Component({ components: {} })
export default class Reports extends Vue {
  name = 'Reports';

  get reports(): Report[] {
    return this.$store.state.Reports.reports as Report[];
  }
}
</script>

<style scoped></style>
