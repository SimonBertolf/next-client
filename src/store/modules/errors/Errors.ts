import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Errors extends VuexModule {
  public error: Error | null = null;

  @Mutation
  setError(error: Error) {
    this.error = error;
  }
}
