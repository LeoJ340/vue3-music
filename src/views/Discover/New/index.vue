<template>
  <div class="flex-horizontal-center">
    <div class="links">
      <el-button round :class="{ active: currentRoute.path.includes('/new/songs') }" @click="toNewSongs">新歌速递</el-button>
      <el-button round :class="{ active: currentRoute.path.includes('/new/discs') }" @click="toNewDiscs" disabled>新碟上架</el-button>
    </div>
  </div>
  <router-view />
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const currentRoute = useRoute()

const router = useRouter();
function toNewSongs() {
  router.push('/discover/new/songs')
}
function toNewDiscs() {
  router.push('/discover/new/discs')
}
</script>

<style scoped lang="scss">
.links {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  .el-button {
    border: none;
  }
  .active {
    color: #ffffff;
    background: #919192;
  }
}
.el-button+.el-button {
  margin-left: 0;
}
</style>
