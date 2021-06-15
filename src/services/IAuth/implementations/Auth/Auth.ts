import axios from 'axios';
import { User, Role } from '@/models';
import { injectable } from 'inversify-props';
import { IAuth } from '../../interfaces';

interface ReamisAuthResponse {
  data: {
    access: { [key: string]: 'read' | 'write' };
    user: {
      email: string;
      fullname: string;
      id: string;
      isDeveloper: boolean;
      name: string;
    };
  };
}

@injectable()
class Auth implements IAuth {
  async currentAuthenticatedUser(): Promise<User | null> {
    await axios.post('/server.php?module=IO_App&action=init');
    const res: { data: { login: boolean } } = await axios.get('/server.php?module=IO_Session&action=checkLogin');
    const { login } = res.data;
    if (!login) return null;
    const { data } = (await axios.get('/server.php?module=IO_Session&action=getEnvironment')) as ReamisAuthResponse;
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
    return reamisNextUser;
  }

  async signIn(username: string, password: string): Promise<User> {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    const options = { headers: { 'content-type': 'application/x-www-form-urlencoded' } };
    return axios.post('/server.php?module=IO_Session&action=login', params, options).then(async () => {
      const response = (await axios.get('/server.php?module=IO_Session&action=getEnvironment')) as ReamisAuthResponse;
      const { access, user } = response.data;
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
      return reamisNextUser;
    });
  }
}

export default Auth;
