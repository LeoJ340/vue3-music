<template>
  <el-scrollbar>
    <div v-if="playlist" class="flex" style="margin-bottom: 20px;">
      <el-image :src="playlist.coverImgUrl" />
      <div class="flex-1" style="margin-left: 20px;">
        <h2>我喜欢的音乐</h2>
        <div class="flex" style="align-items: center;">
          <el-avatar :src="playlist.creator.avatarUrl" />
          <span style="margin-left: 10px; font-size: 12px;">{{playlist.creator.nickname}}</span>
          <span style="margin-left: 10px; font-size: 12px; color: #a4a4a4">{{time(playlist.createTime)}}创建</span>
        </div>
        <div class="flex" style="margin: 15px 0;">
          <el-button-group style="margin-right: 12px">
            <el-button round type="danger" @click="playAll"><PlayOne theme="filled" size="22" />播放全部</el-button>
            <el-button round type="danger" @click="playAll(false)"><Plus theme="filled" size="20" :strokeWidth="3" /></el-button>
          </el-button-group>
          <el-button round ><FolderPlus theme="outline" size="20" :strokeWidth="2"/>收藏</el-button>
          <el-button round ><Share theme="outline" size="20" :strokeWidth="2"/>分享</el-button>
          <el-button round ><Download theme="outline" size="20" :strokeWidth="2"/>下载全部</el-button>
        </div>
        <div style="font-size: 14px;">
          <span>歌曲：{{playlist.trackCount}}</span>
          <span style="margin-left: 10px;">播放：{{playlist.playCount}}</span>
        </div>
        <div class="flex"></div>
      </div>
    </div>
    <div></div>
    <el-table :data="tracks" stripe tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }">
      <el-table-column type="index" width="30" />
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <div style="display: flex; justify-content: space-around;">
            <el-link :underline="false">
              <Like theme="filled" size="20" fill="#ec4141" :strokeWidth="2"/>
            </el-link>
            <el-link :underline="false">
              <Download theme="outline" size="20" :strokeWidth="2"/>
            </el-link>
          </div>
        </template>
      </el-table-column>
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
      <el-table-column prop="al.name" label="专辑" show-overflow-tooltip />
      <el-table-column label="时间" width="100">
        <template #default="scope">
          <span>{{useFormatTime(scope.row.dt / 1000)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getPlayList } from "@/api";
import { Song } from "@/models/song";
import { useFormatTime } from "@/utils/time";
import { PlayOne, Plus, FolderPlus, Share, Download, Like } from '@icon-park/vue-next';
import { usePlayerStore } from "@/stores/player";

const currentRoute = useRoute()
const playlistId = Number(currentRoute.params.id.toString())

const playlist = ref()
const tracks = ref<Song[]>([])
getPlayList(playlistId).then(res => {
  playlist.value = res.playlist
  tracks.value = res.playlist.tracks
})

function time(time: number) {
  const date = new Date(time)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const { playList, push, play } = usePlayerStore()
function playAll(replace:boolean = true) {
  push(tracks.value.filter(item => !item.noCopyrightRcmd), replace)
  if (replace || playList.length === tracks.value.length) {
    play(tracks.value[0].id)
  }
}
</script>

<style lang="scss" scoped>

</style>
