<template>
  <span style="width: 180px;">网易云音乐</span>
  <el-row class="flex-1">
    <!-- 页头 -->
    <el-col :span="8" class="page-header">
      <Left theme="outline" size="18" fill="#ffffff" :strokeWidth="2" />
      <Right theme="outline" size="18" fill="#ffffff" :strokeWidth="2"/>
    </el-col>
    <!-- RIGHT -->
    <el-col :span="16"  class="flex-vertical-center justify-end setting">
      <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      <el-link :underline="false" style="margin-left: 5px;">
        未登录<DownOne class="flex" theme="filled" size="18" :strokeWidth="2"/>
      </el-link>
      <!-- 主题切换 -->
      <el-popover placement="bottom-start" trigger="click" :width="300" :offset="20">
        <template #reference>
          <Theme class="action-icon" theme="outline" size="20" :strokeWidth="2"/>
        </template>
        <h6 class="m-0">主题</h6>
        <div class="theme-list">
          <div v-for="(value, key) in themeList" class="theme-item" @click="changeTheme(key)">{{value}}</div>
        </div>
      </el-popover>
      <SettingTwo class="action-icon" theme="outline" size="20" :strokeWidth="2"/>
      <Mail class="action-icon" theme="outline" size="20" :strokeWidth="2"/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import { Left, Right, DownOne, Theme, SettingTwo, Mail } from '@icon-park/vue-next';

const themeList = reactive({
  dark: '炫酷黑',
  red: '官方红',
  pink: '可爱粉'
})

function changeTheme(theme: string) {
  document.body.className = theme === 'red' ? '' : theme
}
</script>

<style lang="scss" scoped>
.setting {
  .action-icon {
    margin-left: 20px;
    display: flex;
    cursor: pointer;
  }
}
.theme-list {
  display: flex;
  .theme-item {
    width: 100px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    cursor: pointer;
    &:hover {}
  }
}
</style>
