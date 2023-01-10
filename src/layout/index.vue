<template>
  <el-container>
    <el-header>网易云音乐</el-header>
    <el-container style="height: calc(100vh - 131px);">
      <Aside />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <Footer />
  </el-container>
</template>

<script setup lang="ts">
import Aside from './components/Aside.vue'
import Footer from './components/Footer/index.vue'
</script>

<style lang="scss" scoped>
.el-header {
  background-color: rgb(253, 84, 78);
  line-height: 60px;
  color: #ffffff;
}
.el-main {
  position: relative;
}
</style>
