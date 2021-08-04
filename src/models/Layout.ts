import { Translation, WidgetAppearance } from '@/types';
import { ResponsiveWidgetLayoutItems } from '@/types/WidgetLayout';
import { OrganisationDocument } from './Document';

export interface LayoutMeta extends OrganisationDocument {
  name: string;
  displayNames: Translation[];
  description?: string;
}

export interface Layout extends LayoutMeta {
  responsiveLayout: ResponsiveWidgetLayoutItems;
}

export interface ApiLayout extends LayoutMeta {
  widgets: WidgetAppearance[];
}
