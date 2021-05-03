import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Inject } from 'inversify-props';
import { IAuth } from '@/services';
import { User } from '@/models';

@Module({ namespaced: true })
export default class Auth extends VuexModule {
  public user: User | null = null;

  public loading = true;

  @Inject('IAuth') private authService: IAuth;

  @Mutation
  setUser(user: User) {
    this.user = user;
  }

  @Mutation
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  @Action
  public async currentAuthenticatedUser(): Promise<void> {
    return this.authService
      .currentAuthenticatedUser()
      .then((user: User | null) => {
        this.context.commit('setUser', user);
        if (user) this.context.commit('setLoading', false);
        return Promise.resolve();
      })
      .catch((error) => {
        this.context.commit('setLoading', false);
        this.context.commit('Errors/setError', error, { root: true });
        return Promise.reject();
      });
  }

  @Action
  public async signIn({ username, password }: { username: string; password: string }): Promise<void> {
    this.authService
      .signIn(username, password)
      .then((reamisUser: User) => {
        this.context.commit('setUser', reamisUser);
        this.context.commit('setLoading', false);
        return Promise.resolve();
      })
      .catch((error) => {
        this.context.commit('setLoading', false);
        this.context.commit('Errors/setError', error, { root: true });
        return Promise.reject();
      });
  }
}
