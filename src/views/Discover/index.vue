<template>
  <el-menu :default-active="active" mode="horizontal" :router="true">
    <el-menu-item v-for="route in discoverRoutes" :index="`/discover/${route.path}`">{{route.meta.title}}</el-menu-item>
  </el-menu>
  <el-scrollbar view-style="padding: 0 20px;">
    <router-view />
  </el-scrollbar>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";
import discoverRoutes from "@/router/discover";

const currentRoute = useRoute()

const active = computed(() => {
  const currentPath = currentRoute.path.replace('/discover', '').split('/')
  const activeRoute = discoverRoutes.find(item => item.path === currentPath[1])
  if (activeRoute) return `/discover/${activeRoute.path}`
  return ''
})
</script>

<style scoped lang="scss">
.el-scrollbar {
  height: calc(100% - 58px);
}
</style>
