<template>
  <el-scrollbar class="playlist-wrapper">
    <h3 style="padding: 0 12px">当前播放</h3>
    <div style="padding: 0 12px; display: flex; justify-content: space-between;">
      <span style="font-size: 12px">共{{playList.length}}首</span>
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
import { toRefs } from "vue";
import { usePlayerStore } from "@/stores/player";
import { useFormatSeconds } from "@/utils/time";

const { playList, clear } = toRefs(usePlayerStore())
</script>

<style scoped>
.playlist-wrapper {
  width: 100%;
  height: calc(100vh - 131px);
  position: absolute;
  right: 0;
  bottom: 70px;
  box-shadow: 0 0 5px #D1D1D1;
  background-color: #ffffff;
}
</style>
