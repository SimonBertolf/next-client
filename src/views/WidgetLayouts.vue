<template>
  <Card :autoSize="true" :hasTitle="false" :padding="true">
    <h1 class="text-2xl mb-4">Layouts</h1>
    <a-table :columns="columns" :data-source="tableData" :loading="loading">
      <template slot="name" slot-scope="text, record">
        <router-link :to="`/admin/layouts/${record._id}`" v-slot="{ href, navigate }" custom>
          <a-button :href="href" @click="navigate" type="link">
            {{ text }}
          </a-button>
        </router-link>
      </template>
    </a-table>
  </Card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Layout, Card, BackButton, Spinner } from '@/components/app';
import { Heading } from '@/components/typography';
import { Layout as LayoutModel } from '@/models';

interface TableData {
  _id: string;
  key: string;
  name: string;
}

@Component({ components: { Layout, Card, Heading, BackButton, Spinner } })
export default class WidgetLayouts extends Vue {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      scopedSlots: { customRender: 'name' },
    },
  ];

  get loading(): boolean {
    return this.$store.state.Layouts.layoutsLoading;
  }

  get tableData(): TableData[] {
    return this.layouts.map((layout) => ({
      _id: layout._id,
      key: layout._id,
      name: layout.displayNames.find((displayName) => displayName.lang === 'de')?.text || `t('${layout.name}')`,
    }));
  }

  get layouts(): LayoutModel[] {
    return this.$store.state.Layouts.layouts || [];
  }
}
</script>

<style scoped></style>
