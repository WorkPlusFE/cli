<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Hamburger from '@/components/Hamburger/index.vue';

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger,
  },
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }

  get device() {
    return AppModule.device.toString();
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false);
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 50px;
  overflow: hidden;
  position: relative;

  .hamburger-container {
    cursor: pointer;
    float: left;
    height: 100%;
    line-height: 46px;
    padding: 0 15px;
    -webkit-tap-highlight-color: transparent;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
}

.right-menu {
  float: right;
  height: 100%;
  line-height: 50px;

  &:focus {
    outline: none;
  }
}

.right-menu-item {
  color: #5a5e66;
  display: inline-block;
  font-size: 18px;
  height: 100%;
  padding: 0 8px;
  vertical-align: text-bottom;

  &.hover-effect {
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}

.avatar-container {
  margin-right: 30px;

  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .user-avatar {
      border-radius: 10px;
      cursor: pointer;
      height: 40px;
      width: 40px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      font-size: 12px;
      position: absolute;
      right: -20px;
      top: 25px;
    }
  }
}
</style>
