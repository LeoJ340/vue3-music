<template>
  <div class="main-wrapper">
    <el-menu :default-active="active" mode="horizontal" :router="true">
      <el-menu-item v-for="route in indexRoutes" :index="`/discover/${route.path}`">{{route.meta.title}}</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import {indexRoutes} from "@/router";
import {useRoute} from "vue-router";
import {computed} from "vue";

const currentRoute = useRoute()

const active = computed(() => {
  const currentPath = currentRoute.path.replace('/discover', '').split('/')
  const activeRoute = indexRoutes.find(item => item.path === currentPath[1])
  if (activeRoute) return `/discover/${activeRoute.path}`
  return ''
})
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
