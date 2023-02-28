<template>
  <h3>官方榜</h3>
  <div v-for="playlist in topList.slice(0, 4)" class="official-list">
    <div class="cover" @click="toPlayList(playlist.id)">
      <el-image :src="playlist.coverImgUrl" />
      <PlayOne class="play-all" theme="filled" size="32" :strokeWidth="2"/>
      <span class="update-time">{{useFormatTime(playlist.updateTime, 'mm月dd日')}}更新</span>
    </div>
    <el-table :data="playlist.tracks" stripe :show-header="false" tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }">
      <el-table-column type="index" width="50"/>
      <el-table-column label="标题" show-overflow-tooltip>
        <template #default="scope">
          <span>{{scope.row.first}}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手" align="right" show-overflow-tooltip>
        <template #default="scope">
          <span style="color:#919192;">{{scope.row.second}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-link class="more" :underline="false" @click="toPlayList(playlist.id)">查看更多<Right theme="outline" /></el-link>
  </div>

  <h3>全球榜</h3>
  <PlayLists :playlists="topList.slice(4)" />
</template>

<script setup lang="ts">
import {ref} from "vue";
import { PlayOne, Right } from "@icon-park/vue-next";
import {getTopList} from "@/api/playlist";
import {TopList} from "@/models/PlayList";
import {useRouter} from "vue-router";
import PlayLists from '@/components/PlayLists/index.vue'
import {useFormatTime} from "@/utils/time";

const topList = ref<TopList[]>([])
getTopList().then(res => {
  topList.value = res
})

const router = useRouter()
function toPlayList(id: number) {
  router.push(`/playlist/${id}`)
}
</script>

<style scoped lang="scss">
.official-list {
  display: flex;
  margin-bottom: 20px;
  position: relative;
  .cover {
    width: 230px;
    margin-right: 30px;
    position: relative;
    cursor: pointer;
    .play-all {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.8);
      color: var(--player-theme);
      visibility: hidden;
      opacity: 0;
    }
    &:hover .play-all {
      visibility: visible;
      opacity: 1;
    }
    .update-time {
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
    }
  }
  .more {
    position: absolute;
    bottom: 0;
    left: 230px;
  }
}
</style>
