<template>
  <FlexLayout class="gap-4 sm:gap-8 sm:p-8 flex-col-reverse sm:flex-row sm:flex-nowrap">
    <FlexLayout :grow="1" :column="true" :gap="6" class="w-full">
      <h6 class="font-bold font-primary text-3xl hidden sm:block">Keyfigures</h6>
      <KpiListContainer />
    </FlexLayout>
    <FlexLayout :grow="1" class="px-4 sm:p-0 w-full">
      <div
        style="min-height: 100px; min-width: 200px"
        class="w-full bg-primary flex justify-center items-center text-neutral"
      >
        Images
      </div>
    </FlexLayout>
  </FlexLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { FlexLayout } from '@/components/app';
import { KpiListContainer } from '../KpiListContainer';

@Component({ components: { FlexLayout, KpiListContainer } })
export default class BasicData extends Vue {}
</script>

<style scoped></style>
