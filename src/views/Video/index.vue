<template>
  <el-menu :default-active="active" mode="horizontal" :router="true">
    <el-menu-item v-for="route in videoRoutes" :index="`/video/${route.path}`">{{route.meta.title}}</el-menu-item>
  </el-menu>
  <el-scrollbar view-style="padding: 0 20px;">
    <router-view />
  </el-scrollbar>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";
import videoRoutes from "@/router/video";

const currentRoute = useRoute()

const active = computed(() => {
  // 根据第二级路由path判断当前激活的路由
  const currentPath = currentRoute.path.replace('/video', '').split('/')
  const activeRoute = videoRoutes.find(item => item.path === currentPath[1])
  if (activeRoute) return `/video/${activeRoute.path}`
  return ''
})
</script>

<style scoped lang="scss">
.el-scrollbar {
  height: calc(100% - 58px);
}
</style>
