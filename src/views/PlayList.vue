<template>
  <el-scrollbar>
    <div v-if="playlist" class="flex" style="margin-bottom: 20px;">
      <el-image :src="playlist.coverImgUrl" />
      <div class="flex-1" style="margin-left: 20px;">
        <h2>我喜欢的音乐</h2>
        <div class="flex" style="align-items: center;">
          <el-avatar :src="playlist.creator.avatarUrl" />
          <span style="margin-left: 5px; font-size: 12px;">{{playlist.creator.nickname}}</span>
          <span style="margin-left: 5px; font-size: 12px;">{{time(playlist.createTime)}}创建</span>
        </div>
        <div class="flex" style="margin: 15px 0;">
          <el-button-group style="margin-right: 12px">
            <el-button round type="danger" :icon="CaretRight" >播放全部</el-button>
            <el-button round type="danger" :icon="Plus"/>
          </el-button-group>
          <el-button round :icon="FolderAdd">收藏</el-button>
          <el-button round :icon="Share">分享</el-button>
          <el-button round :icon="Download">下载全部</el-button>
        </div>
        <div style="font-size: 14px;">
          <span>歌曲：{{playlist.trackCount}}</span>
          <span style="margin-left: 10px;">播放：{{playlist.playCount}}</span>
        </div>
        <div class="flex"></div>
      </div>
    </div>
    <div></div>
    <el-table :data="tracks" stripe>
      <el-table-column type="index" width="30" />
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <el-link :underline="false" :icon="Star" />
          <el-link :underline="false" :icon="Download" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="标题" />
      <el-table-column label="歌手">
        <template #default="scope">
          <span>{{scope.row.ar.map(ar => ar.name).join('/')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" />
      <el-table-column label="时间" width="60">
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
import { usePlayList } from "@/api";
import { Song } from "@/models/song";
import { useFormatTime } from "@/utils/time";
import { CaretRight, Plus, FolderAdd, Share, Download, Star } from '@element-plus/icons-vue';

const currentRoute = useRoute()
const playlistId = Number(currentRoute.params.id.toString())

const playlist = ref()
const tracks = ref<Song>()
usePlayList(playlistId).then(res => {
  playlist.value = res.playlist
  tracks.value = res.playlist.tracks
})

function time(time: number) {
  const date = new Date(time)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
</script>

<style lang="scss" scoped>

</style>
