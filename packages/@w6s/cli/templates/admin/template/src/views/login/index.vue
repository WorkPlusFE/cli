<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          name="username"
          type="text"
          autocomplete="on"
          placeholder="username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="password"
          name="password"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :name="passwordType === 'password' ? 'eye-off' : 'eye-on'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="margin-bottom: 30px; width: 100%"
        @click.native.prevent="handleLogin"
      >
        Sign in
      </el-button>

      <div style="position: relative">
        <div class="tips">
          <span> username: admin </span>
          <span> password: any </span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { Dictionary } from 'vue-router/types/router';
import { Form as ElForm, Input } from 'element-ui';
import { UserModule } from '@/store/modules/user';

@Component({
  name: 'Login',
})
export default class extends Vue {
  private loginForm = {
    username: 'admin',
    password: '111111',
  };

  private passwordType = 'password';

  private loading = false;

  private showDialog = false;

  private redirect?: string;

  private otherQuery: Dictionary<string> = {};

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    const query = route.query as Dictionary<string>;
    if (query) {
      this.redirect = query.redirect;
      this.otherQuery = this.getOtherQuery(query);
    }
  }

  mounted() {
    if (this.loginForm.username === '') {
      (this.$refs.username as Input).focus();
    } else if (this.loginForm.password === '') {
      (this.$refs.password as Input).focus();
    }
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = '';
    } else {
      this.passwordType = 'password';
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus();
    });
  }

  private async handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true;
        await UserModule.Login(this.loginForm);
        this.$router.push({
          path: this.redirect || '/',
          query: this.otherQuery,
        });
        setTimeout(() => {
          this.loading = false;
        }, 0.5 * 1000);
      } else {
        return false;
      }
    });
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur];
      }
      return acc;
    }, {} as Dictionary<string>);
  }
}
</script>

<style lang="scss">
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      appearance: none;
      background: transparent;
      border: 0;
      border-radius: 0;
      caret-color: $loginCursorColor;
      color: $lightGray;
      height: 47px;
      padding: 12px 5px 12px 15px;
    }

    input:-webkit-autofill {
      box-shadow: 0 0 0 1000px $loginBg inset !important;
      -webkit-text-fill-color: #fff !important;
    }
  }

  .el-form-item {
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  background-color: $loginBg;
  height: 100%;
  overflow: hidden;
  width: 100%;

  .login-form {
    margin: 0 auto;
    max-width: 100%;
    overflow: hidden;
    padding: 160px 35px 0;
    position: relative;
    width: 520px;
  }

  .tips {
    color: #fff;
    font-size: 14px;
    margin-bottom: 10px;

    span :first-of-type {
      margin-right: 16px;
    }
  }

  .svg-container {
    color: $darkGray;
    display: inline-block;
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
  }

  .title-container {
    position: relative;

    .title {
      color: $lightGray;
      font-size: 26px;
      font-weight: bold;
      margin: 0 auto 40px;
      text-align: center;
    }
  }

  .show-pwd {
    color: $darkGray;
    cursor: pointer;
    font-size: 16px;
    position: absolute;
    right: 10px;
    top: 7px;
    user-select: none;
  }
}
</style>
