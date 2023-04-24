<template>
  <el-scrollbar class="playlist-wrapper">
    <h3 style="margin-left: 12px;">当前播放</h3>
    <div class="playlist-action">
      <span>共{{songs.length}}首</span>
      <el-link type="primary" :underline="false" @click="clear">清空列表</el-link>
    </div>
    <el-table
        :data="songs" stripe :show-header="false"
        tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }"
        :row-class-name="playingClass"
        @row-dblclick="dblclickPlay">
      <el-table-column label="标题" :show-overflow-tooltip="true">
        <template #default="scope">
          <span v-show="isPlaying(scope.row)" style="margin-right: 5px;">
            <Pause v-show="player.paused" theme="outline" size="12" :strokeWidth="7"/>
            <PlayOne v-show="!player.paused" theme="filled" size="12" :strokeWidth="3"/>
          </span>
          <span>{{scope.row.name}}</span>
          <span v-if="scope.row.alia.length" style="color:#919192;">（{{scope.row.alia.join('')}}）</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手" :show-overflow-tooltip="true">
        <template #default="scope">
          <ArtistColumn :artists="scope.row.ar" />
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
import {Song} from "@/models/Song";
import { Pause, PlayOne } from '@icon-park/vue-next';
import ArtistColumn from '@/components/Songs/ArtistColumn.vue'

const playerStore = usePlayerStore()
const { songs, currentPlay, player } = storeToRefs(playerStore)
const { push, clear } = playerStore

function isPlaying(song: Song) {
  return song.id === currentPlay.value?.id
}

function playingClass(row: { row: Song, rowIndex: number }) {
  return isPlaying(row.row) ? 'playing' : ''
}

function dblclickPlay(song: Song) {
  if (song.noCopyrightRcmd) return
  const starIndex = songs.value.findIndex(item => item.id === song.id)
  push(songs.value.filter(item => !item.noCopyrightRcmd), { replace: true, starIndex, trigger: 'doubleClick' })
}
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
  color: var(--main-text);
}
.playlist-action {
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 12px;
}
</style>
