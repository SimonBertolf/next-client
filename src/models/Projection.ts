import { Translation } from '@/types';
import { OrganisationDocument } from './Document';

export type Resolution = 'yearly' | 'quarterly' | 'monthly';

export interface ProjectionInput {
  readonly _id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: { [key: string]: any };
  displayNames: Translation[];
  values: number[];
}

export interface ProjectionActual {
  name: string;
  section: string; // reference to section
  displayNames: Translation[];
  values: number[];
}

export interface ProjectionMilestone {
  readonly _id?: string;
  name: string;
  description?: string;
  date: Date;
}

export interface ProjectionSection {
  readonly _id?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: { [key: string]: any };
  type: 'sale' | 'income' | 'cost' | 'funding' | 'equity';
  displayNames: Translation[];
  inputs: ProjectionInput[];
}

export interface ProjectionMeta extends OrganisationDocument {
  name: string;
  description?: string;
  from: Date;
  to: Date;
  resolution: Resolution;
}

export interface Projection extends ProjectionMeta {
  sections: ProjectionSection[];
  milestones: ProjectionMilestone[];
}
