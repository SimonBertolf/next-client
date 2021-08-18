<template>
  <Card :autoSize="true" :hasTitle="false" :padding="true">
    <h1 class="font-primary text-2xl mb-4">{{ name }}</h1>
    <spinner :spinning="loading">
      <!-- TODO: setup working pagination -->
      <a-table :columns="columns" :data-source="tableData">
        <template slot="name" slot-scope="text, record">
          <router-link :to="`/planning/projections/${record._id}`" v-slot="{ href, navigate }" custom>
            <a-button :href="href" @click="navigate" type="link" class="px-0">
              {{ text }}
            </a-button>
          </router-link>
        </template>
        <template slot="createdAt" slot-scope="text">{{ text | dateTime }}</template>
      </a-table>
    </spinner>
  </Card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Spinner, Card } from '@/components/app';
import { Projection } from '@/models';

interface TableData {
  _id: string;
  key: string;
  name: string;
}

@Component({ components: { Spinner, Card } })
export default class Projections extends Vue {
  name = 'Cashflow Projections';

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      scopedSlots: { customRender: 'name' },
    },
  ];

  get loading(): boolean {
    // TODO: replace mock
    return this.$store.state.Projections.loading?.projections;
  }

  get projections(): Projection[] {
    return (this.$store.state.Projections.projections as Projection[]) || [];
  }

  get tableData(): TableData[] {
    // TODO: replace mock
    return this.projections.map((projection) => ({
      _id: projection._id,
      key: projection._id,
      name: projection.name,
      createdAt: projection.createdAt,
    }));
  }
}
</script>

<style scoped></style>
