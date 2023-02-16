<template>
  <div class="main-wrapper">
    <el-menu default-active="/index/recommend" mode="horizontal" :router="true">
      <el-menu-item index="/index/recommend">个性推荐</el-menu-item>
      <el-menu-item index="3" disabled>歌单</el-menu-item>
      <el-menu-item index="4" disabled>排行榜</el-menu-item>
      <el-menu-item index="5" disabled>歌手</el-menu-item>
      <el-menu-item index="6" disabled>最新音乐</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script setup lang="ts">

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
  }
}
</style>
