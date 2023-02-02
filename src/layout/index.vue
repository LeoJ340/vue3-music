<template>
  <el-container>
    <el-header class="flex-vertical-center">
      <Header />
    </el-header>

    <el-container style="height: calc(100vh - 131px);">
      <Aside />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <!-- Player -->
    <Footer />
  </el-container>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import Footer from './components/Footer/index.vue'
</script>

<style lang="scss" scoped>
.el-header {
  background-color: var(--header-bg);
  line-height: 60px;
  color: #ffffff;
}
.el-main {
  position: relative;
}
</style>
