import { Role } from '../Role';

interface User {
  readonly id: number;
  email: string;
  username: string;
  fullname: string;
  isDeveloper: boolean;
  roles: Role[];
}

export default User;
