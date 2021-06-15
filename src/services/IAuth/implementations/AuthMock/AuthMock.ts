import { injectable } from 'inversify-props';
import { User } from '@/models';
import { userMock } from '@/../__mocks__/UserMocks';
import { IAuth } from '../../interfaces';

@injectable()
class AuthMock implements IAuth {
  async currentAuthenticatedUser(): Promise<User | null> {
    return Promise.resolve(userMock);
  }

  async signIn(): Promise<User> {
    return Promise.resolve(userMock);
  }
}

export default AuthMock;
