<template>
  <div class="home">
    <div class="logo">
      <img alt="Vue logo" width="100" src="../assets/logo.png" />
      <h3>Welcome to Your H5 App</h3>
    </div>
    <hello-world />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss">
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
