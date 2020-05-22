<template>
  <div class="hello">
    <h4>Essential Links</h4>
    <van-cell-group>
      <van-cell title="Core Docs" is-link url="https://vuejs.org" />
      <van-cell title="Forum" is-link url="https://forum.vuejs.org" />
      <van-cell title="Community Chat" is-link url="https://chat.vuejs.org" />
      <van-cell title="News" is-link url="https://news.vuejs.org" />
    </van-cell-group>
    <h4>Ecosystem</h4>
    <van-cell-group>
      <van-cell title="vue-router" is-link url="https://router.vuejs.org" />
      <van-cell title="vuex" is-link url="https://vuex.vuejs.org" />
      <van-cell title="vue-devtools" is-link url="https://github.com/vuejs/vue-devtools#vue-devtools" />
      <van-cell title="vue-loader" is-link url="https://vue-loader.vuejs.org" />
      <van-cell title="awesome-vue" is-link url="https://github.com/vuejs/awesome-vue" />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Cell, CellGroup } from 'vant';

@Component({
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

h4 {
  color: #42b983;
  text-align: center;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
