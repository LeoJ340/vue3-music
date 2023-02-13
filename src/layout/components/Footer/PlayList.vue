<template>
  <el-scrollbar class="playlist-wrapper">
    <h3 style="margin-left: 12px;">当前播放</h3>
    <div class="playlist-action">
      <span>共{{playList.length}}首</span>
      <el-link type="primary" :underline="false" @click="clear">清空列表</el-link>
    </div>
    <el-table :data="playList" stripe :show-header="false" tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }">
      <el-table-column label="标题" show-overflow-tooltip>
        <template #default="scope">
          <span>{{scope.row.name}}</span>
          <span v-if="scope.row.alia.length" style="color:#919192;">（{{scope.row.alia.join('')}}）</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手" show-overflow-tooltip>
        <template #default="scope">
          <span>{{scope.row.ar.map(ar => ar.name).join('/')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="100">
        <template #default="scope">
          <span>{{useFormatSeconds(scope.row.dt / 1000)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/player";
import { useFormatSeconds } from "@/utils/time";

const playerStore = usePlayerStore()
const { playList } = storeToRefs(playerStore)
const { clear } = playerStore
</script>

<style scoped>
.playlist-wrapper {
  width: 100%;
  height: calc(100vh - 130px);
  position: absolute;
  right: 0;
  bottom: 70px;
  box-shadow: 0 0 1px #D1D1D1;
  background-color: var(--playlist-bg);
  color: var(--playlist-text);
}
.playlist-action {
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 12px;
}
</style>
