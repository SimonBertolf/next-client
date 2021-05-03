import { User } from '@/models';

interface IAuth {
  currentAuthenticatedUser(): Promise<User | null>;
  signIn(username: string, password: string): Promise<User>;
}

export default IAuth;
