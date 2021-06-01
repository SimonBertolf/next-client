import { GridItemData } from 'vue-grid-layout';

export interface WidgetItem extends GridItemData {
  type: 'WidgetA' | 'WidgetB' | 'WidgetC';
}
