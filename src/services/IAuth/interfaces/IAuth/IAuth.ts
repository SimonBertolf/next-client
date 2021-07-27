import { User } from '@/models';

export interface IAuth {
  currentAuthenticatedUser(): Promise<User | null>;
}
