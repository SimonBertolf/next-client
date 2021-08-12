import { OrganisationDocument } from './Document';

export interface Projection extends OrganisationDocument {
  name: string;
  description?: string;
}
