<template>
  <Card :autoSize="true" :hasTitle="false" :padding="true">
    <h1 class="text-2xl mb-4">Dashboards</h1>
    <!-- TODO: setup working pagination -->
    <spinner :spinning="loading">
      <a-table :columns="columns" :data-source="tableData">
        <template slot="name" slot-scope="text">{{ text }}</template>
        <template slot="pos" slot-scope="text">{{ text }}</template>
        <template slot="enabled" slot-scope="val, record">
          <a-switch :default-checked="val" @change="onEnabledToggle(record._id, $event)" />
        </template>
      </a-table>
    </spinner>
  </Card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Card, Spinner } from '@/components/app';
import { Dashboard } from '@/models';

interface TableData {
  _id: string;
  key: string;
  name: string;
  pos: number;
  enabled: boolean;
}

@Component({ components: { Card, Spinner } })
export default class DashboardsAdmin extends Vue {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Position',
      dataIndex: 'pos',
      key: 'pos',
    },
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      key: 'enabled',
      scopedSlots: { customRender: 'enabled' },
    },
  ];

  get loading(): boolean {
    return this.$store.state.Dashboards.loading.dashboards;
  }

  get dashboards(): Dashboard[] {
    return this.$store.state.Dashboards.dashboards || [];
  }

  get tableData(): TableData[] {
    return this.dashboards.map((dashboard: Dashboard) => ({
      _id: dashboard._id,
      key: dashboard._id,
      name: dashboard.displayNames.find((displayName) => displayName.lang === 'de')?.text || `t('${dashboard.name}')`,
      pos: dashboard.pos,
      enabled: dashboard.enabled,
    }));
  }

  onEnabledToggle(_id: string, val: boolean): void {
    this.$store.dispatch('Dashboards/updateDashboard', { _id, enabled: val });
  }
}
</script>

<style scoped></style>
