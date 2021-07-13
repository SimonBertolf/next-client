<template>
  <FlexLayout justify="between" :grow="1" class="sm:gap-8">
    <KpiList v-for="kpiGroup in kpiGroups" :key="kpiGroup.id" :kpiGroup="kpiGroup" class="hidden sm:flex sm:flex-col" />
    <KpiListMobile v-for="kpiGroup in kpiGroups" :key="`${kpiGroup.id}mobile`" :kpiGroup="kpiGroup" class="sm:hidden" />
  </FlexLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { inject } from 'inversify-props';
import { IKpiService } from '@/services';
import { KpiGroup, Asset } from '@/models';
import { FlexLayout } from '@/components/app';
import { KpiList } from '../KpiList';
import { KpiListMobile } from '../KpiListMobile';

@Component({ components: { FlexLayout, KpiList, KpiListMobile } })
export default class KpiListContainer extends Vue {
  @inject('KpiService') kpiService: IKpiService;

  kpiGroups: KpiGroup[] = [];

  mounted(): void {
    if (this.asset) {
      this.kpiService.loadAssetKpis(this.asset.id).then((kpiGroups) => {
        this.kpiGroups = kpiGroups;
      });
    } else {
      throw new Error('Asset is required for loading Kpis');
    }
  }

  get asset(): Asset {
    return this.$store.state.Assets.asset;
  }
}
</script>

<style scoped></style>
