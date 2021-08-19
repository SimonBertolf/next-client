import { TableData } from '@/types';
import { ProjectionResolverContext } from './Context';

export interface ProjectionResolver {
  resolve(ctx: ProjectionResolverContext): TableData[];
  setNext(resolver: ProjectionResolver): void;
}
