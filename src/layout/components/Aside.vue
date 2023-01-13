<template>
  <el-aside width="200px">
    <el-scrollbar>
      <ul class="menu">
        <li v-for="menuGroup in menuGroups" class="menu-group">
          <div class="menu-group_title">{{menuGroup.title}}</div>
          <router-link v-for="menuItem in menuGroup.list"
                       class="menu-group_item" :class="{ active: isActive(menuItem.path) }"
                       :to="menuItem.path">
            <Component :is="menuItem.icon" theme="outline" size="20" fill="#000000" :strokeWidth="2" />
            <span style="margin-left: 5px;">{{menuItem.text}}</span>
          </router-link>
        </li>
      </ul>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Like, Download } from '@icon-park/vue-next';

const router = useRouter()
const menuGroups = [
  {
    title: '我的音乐',
    list: [
      {
        path: '/my/playlist/2428211358',
        text: '我喜欢的音乐',
        icon: Like
      },
      {
        path: '/my/cloud',
        text: '我的音乐云盘',
        icon: Download
      }
    ]
  }
]

function isActive(path: string) {
  return router.currentRoute.value.fullPath === path
}
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: rgb(255, 255, 255);
  border-right: 1px solid rgb(224, 224, 244);
  .menu {
    padding: 0;
    .menu-group_title {
      padding-left: 20px;
      font-size: 14px;
      color: rgb(169, 169, 169);
    }
    .menu-group_item {
      display: flex;
      align-items: center;
      padding: 10px 20px 10px 5px;
      color: rgb(135, 135, 135);
      &.active, &:hover {
        background-color: rgb(246, 246, 247);
        color: #000000;
      }
    }
  }
}
</style>
