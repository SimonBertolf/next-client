import axios, { AxiosResponse } from 'axios';
import { User, Role, ApiResponseBody } from '@/models';
import { injectable } from 'inversify-props';
import { IAuth } from '../../interfaces';

interface ReamisAuthResponse {
  access: { [key: string]: 'read' | 'write' };
  user: {
    email: string;
    fullname: string;
    id: string;
    isDeveloper: boolean;
    name: string;
  };
}

@injectable()
class Auth implements IAuth {
  async currentAuthenticatedUser(): Promise<User | null> {
    // await axios.post('legacy/server?module=IO_App&action=init');
    const axiosResponse: AxiosResponse<ApiResponseBody<ReamisAuthResponse>> = await axios.get(
      '/legacy/server?module=IO_Session&action=getEnvironment',
    );
    const { data: apiResponse } = axiosResponse;
    const { data } = apiResponse;
    if (!data) throw new Error('did not get environment data from getEnvironment action');
    const { access, user } = data;
    const keys = Object.keys(access);
    const roles = keys.map((key: string): Role => ({ label: key, operation: access[key] }));
    const { email, fullname, id, isDeveloper, name } = user;
    const reamisNextUser: User = {
      email,
      fullname,
      id,
      isDeveloper,
      username: name,
      roles,
    };
    return email ? reamisNextUser : null;
  }
}

export default Auth;
