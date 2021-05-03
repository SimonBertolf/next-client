<template>
  <div>
    <primary-list-item-link
      :to="getRoute"
      :descriptions="descriptions"
      :column="{ xs: 1, sm: 3, md: 5 }"
      :onEdit="toggleEdit"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { DescriptionType } from '@/types';
import { PrimaryListItemLink } from '@/components/app';

@Component({ components: { PrimaryListItemLink } })
export default class AssetListItem extends Vue {
  editable = false;

  get getRoute(): string {
    return '';
  }

  get descriptions(): Array<DescriptionType> {
    return [];
  }

  toggleEdit(event: { preventDefault: Function }): void {
    event.preventDefault();
    this.editable = !this.editable;
  }
}
</script>

<style scoped></style>
