<template>
  <Card :autoSize="true" :hasTitle="false" :padding="true">
    <h1 class="text-2xl mb-4">{{ name }}</h1>
    <spinner :spinning="loading">
      <!-- TODO: setup working pagination -->
      <a-table :columns="columns" :data-source="tableData">
        <template slot="name" slot-scope="text, record">
          <router-link :to="`/reporting/reports/${record._id}`" v-slot="{ href, navigate }" custom>
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
import { Report } from '@/models';

interface TableData {
  _id: string;
  key: string;
  name: string;
}

@Component({ components: { Spinner, Card } })
export default class Reports extends Vue {
  name = 'Reports';

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'Erstellt am',
      dataIndex: 'createdAt',
      key: 'createdAt',
      scopedSlots: { customRender: 'createdAt' },
    },
  ];

  get loading(): boolean {
    return this.$store.state.Reports.loading.reports;
  }

  get reports(): Report[] {
    return (this.$store.state.Reports.reports as Report[]) || [];
  }

  get tableData(): TableData[] {
    return this.reports.map((report) => ({
      _id: report._id,
      key: report._id,
      name: report.name,
      createdAt: report.createdAt,
    }));
  }
}
</script>

<style scoped></style>
