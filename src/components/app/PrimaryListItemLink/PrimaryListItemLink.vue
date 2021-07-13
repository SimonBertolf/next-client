<template>
  <route-localized :to="to">
    <primary-list-item>
      <descriptions :descriptions="descriptions" :column="column" />
      <span class="self-center"><button-edit :onClick="onEdit" /></span>
    </primary-list-item>
  </route-localized>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { DescriptionType, ColumnType } from '@/types';
import { RouteLocalized } from '../RouteLocalized';
import { PrimaryListItem } from '../PrimaryListItem';
import { Descriptions } from '../Descriptions';
import { ButtonEdit } from '../ButtonEdit';

@Component({
  components: {
    RouteLocalized,
    PrimaryListItem,
    Descriptions,
    ButtonEdit,
  },
})
export default class PrimaryListItemLink extends Vue {
  @Prop({ required: true }) readonly to: string;

  @Prop({ default: () => [] }) readonly descriptions: Array<DescriptionType>;

  @Prop({ required: true }) readonly column: ColumnType;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ required: true }) readonly onEdit: (...args: any[]) => any;
}
</script>

<style scoped></style>
