import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Inject } from 'inversify-props';
import type { IAuth } from '@/services';
import type { User } from '@/models';

@Module({ namespaced: true })
export default class Auth extends VuexModule {
  public user: User | null = null;

  public loading = true;

  @Inject('IAuth') private authService: IAuth;

  @Mutation
  setUser(user: User): void {
    this.user = user;
  }

  @Mutation
  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  @Action
  public async currentAuthenticatedUser(): Promise<void> {
    return this.authService
      .currentAuthenticatedUser()
      .then(async (user: User | null) => {
        this.context.commit('setUser', user);
        if (user) this.context.commit('setLoading', false);
      })
      .catch((error) => {
        this.context.commit('setLoading', false);
        this.context.commit('Errors/setError', error, { root: true });
        return Promise.reject();
      });
  }
}
