<template>
  <div class="about">
    <h2 center>{{ title }}</h2>
    <van-divider>Vuex</van-divider>
    <van-row type="flex" justify="center">
      <van-col span="8">
        <van-button type="warning" @click="decrement">Decrement</van-button>
      </van-col>
      <van-col span="8">{{ count }}</van-col>
      <van-col span="8">
        <van-button type="primary" @click="increment">Increment</van-button>
      </van-col>
    </van-row>
    <van-divider>Cordova</van-divider>
    <van-button @click="handleGetLocation" type="info">Get Location</van-button>
    /
    <van-button @click="handleGetDeviceInfo" type="info">Get Device Info</van-button>
    <van-divider>Mock</van-divider>
    <van-button @click="handleGetUserDetail" type="info">Get User Detail</van-button>
    /
    <van-button @click="handleGetUsers" type="info">Get Users</van-button>
    <van-divider>i18n</van-divider>
    <p>{{ $t("message.title") }}</p>
    <p>{{ $t("message.description") }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Row, Col, Button, Divider } from "vant";
import counter from "../store/modules/Counter";
import { getLocation, getDeviceInfo } from "../utils/cordova";
import { getUserDetail, getUsers } from "../api/user";

@Component({
  computed: {
    count: () => counter.count,
  },
  methods: {
    decrement: counter.decr,
    increment: counter.incr,
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Divider.name]: Divider,
  },
})
export default class AboutView extends Vue {
  private title = "About Page!";

  private location = "";

  private deviceInfo = "";

  handleGetLocation() {
    getLocation().then(({ data }) => {
      console.log(JSON.stringify(data));
    });
  }

  handleGetDeviceInfo() {
    getDeviceInfo().then(({ data }) => {
      console.log(JSON.stringify(data));
    });
  }

  handleGetUserDetail() {
    getUserDetail().then((res) => {
      console.log(JSON.stringify(res));
    });
  }

  handleGetUsers() {
    getUsers().then((res) => {
      console.log(JSON.stringify(res));
    });
  }
}
</script>

<style lang="scss">
.about {
  padding: 0 15px;
}

.van-col {
  text-align: center;
}
</style>
