import { Role } from './Role';

export interface User {
  readonly id: string;
  email: string;
  username: string;
  fullname: string;
  isDeveloper: boolean;
  roles: Role[];
}
