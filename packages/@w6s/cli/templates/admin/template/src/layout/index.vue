<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { AppModule } from '@/store/modules/app';
import { AppMain, Navbar, Sidebar } from './components';
import ResizeMixin from './mixin/resize';

@Component({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
  },
})
export default class extends mixins(ResizeMixin) {
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
    };
  }

  private handleClickOutside() {
    AppModule.CloseSideBar(false);
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;

  height: 100%;
  position: relative;
  width: 100%;
}

.drawer-bg {
  background: #000;
  height: 100%;
  opacity: 0.3;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
}

.main-container {
  margin-left: $sideBarWidth;
  min-height: 100%;
  position: relative;
  transition: margin-left 0.28s;
}

.sidebar-container {
  bottom: 0;
  font-size: 0;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  transition: width 0.28s;
  width: $sideBarWidth !important;
  z-index: 1001;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
