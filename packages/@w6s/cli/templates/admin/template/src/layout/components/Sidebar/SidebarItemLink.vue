<template>
  <router-link :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "SidebarItemLink",
})
export default class extends Vue {
  @Prop({ required: true }) private to!: string;
}
</script>
