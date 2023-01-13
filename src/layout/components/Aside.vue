<template>
  <el-aside width="200px">
    <el-scrollbar>
      <ul class="menu">
        <li class="menu-group">
          <div class="menu-group_title">我的音乐</div>
          <div class="menu-group_item">
            <router-link to="/my/playlist/2428211358">我喜欢的音乐</router-link>
          </div>
          <div class="menu-group_item">
            <router-link to="/my/cloud">我的音乐云盘</router-link>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const routes = useRouter().options.routes.filter(route => !route.hidden)

</script>

<style lang="scss" scoped>
.el-aside {
  background-color: rgb(255, 255, 255);
  border-right: 1px solid rgb(224, 224, 244);
  .menu {
    padding-left: 20px;
    padding-right: 5px;
    .menu-group_title {
      color: rgb(229, 229, 229);
      font-size: 14px;
    }
    .menu-group_item a {
      display: block;
      padding: 10px 0;
    }
    .menu-group_item a:hover {
      background-color: rgb(246, 246, 247);
    }
  }
}
</style>
