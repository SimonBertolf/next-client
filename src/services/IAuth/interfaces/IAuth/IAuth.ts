import { User } from '@/models';

interface IAuth {
  currentAuthenticatedUser(): Promise<User | null>;
}

export default IAuth;
