<template>
  <div class="main-wrapper">
    <el-menu :default-active="currentRoute.path" mode="horizontal" :router="true">
      <el-menu-item v-for="route in indexRoutes" :index="`/discover/${route.path}`">{{route.meta.title}}</el-menu-item>
      <el-menu-item index="6" disabled>最新音乐</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import {indexRoutes} from "@/router";
import {useRoute} from "vue-router";

const currentRoute = useRoute()
</script>

<style scoped lang="scss">
.main-wrapper {
  margin: 20px;
}
.el-menu {
  border-bottom: none;
  margin-bottom: 10px;
  --el-menu-bg-color: var(--main-bg);
  --el-menu-text-color: var(--main-text);
  --el-menu-hover-bg-color: var(--main-bg);
  --el-menu-hover-text-color: var(--main-text);
  --el-menu-active-color: var(--main-text);
  --el-menu-item-font-size: 16px;
  .el-menu-item.is-active {
    font-size: 20px;
    font-weight: 700;
    border-bottom: 2px solid var(--player-theme);
  }
}
</style>
