<template>
  <el-container>
    <el-header>网易云音乐</el-header>
    <el-container style="height: calc(100vh - 121px);">
      <Aside />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer></el-footer>
  </el-container>
</template>

<script setup lang="ts">
import Aside from './components/Aside.vue'

</script>

<style scoped>
.el-header {
  background-color: rgb(253, 84, 78);
  line-height: 60px;
  color: #ffffff;
}
.el-main {
  position: relative;
}
.el-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgb(224, 224, 224);
  background-color: rgb(255, 255, 255);
}
</style>
