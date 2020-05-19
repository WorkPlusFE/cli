import {
  Module, VuexModule, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import store from '..';

@Module({
  dynamic: true,
  store,
  name: 'counter',
})
class Counter extends VuexModule {
  count = 0

  @Mutation
  increment(delta: number) {
    this.count += delta;
  }

  @Mutation
  decrement(delta: number) {
    this.count -= delta;
  }

  get countNum() {
    return this.count;
  }

  // action 'incr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: 'increment' })
  incr() {
    return 5;
  }

  // action 'decr' commits mutation 'decrement' when done with return value as payload
  @Action({ commit: 'decrement' })
  decr() {
    return 5;
  }
}

export default getModule(Counter);
