import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { getToken, setToken } from '@/utils/cookies';
import { login } from '@/api/user';

export interface UserState {
  token: string;
  name: string;
}

@Module({ dynamic: true, name: 'user', store })
class User extends VuexModule implements UserState {
  token = getToken() || ''

  name = ''

  @Mutation
  SET_TOKEN(token: string) {
    this.token = token;
  }

  @Action
  async Login(userInfo: { username: string; password: string }) {
    const { password } = userInfo;

    let { username } = userInfo;
    username = username.trim();
    const { data } = await login({ username, password });
    setToken(data.token);
    this.SET_TOKEN(data.token);
  }
}

export const UserModule = getModule(User);
