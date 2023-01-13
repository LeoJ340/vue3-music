<template>
  <el-scrollbar>
    <header>
      <h3 style="margin-top: 0">我的音乐云盘</h3>

      <el-button-group>
        <el-button round type="danger" :icon="CaretRight" @click="playAll">播放全部</el-button>
        <el-button round type="danger" :icon="Plus" />
      </el-button-group>
      <el-button round :icon="Plus" style="margin-left: 20px">上传音乐</el-button>
    </header>


    <el-table :data="music" stripe>
      <el-table-column type="index" />
      <el-table-column prop="title" label="音乐标题" />
      <el-table-column prop="singer" label="歌手" />
      <el-table-column prop="album" label="专辑" />
      <el-table-column prop="format" label="格式" />
      <el-table-column prop="size" label="大小" />
      <el-table-column prop="uploadTime" label="上传时间" />
    </el-table>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { CaretRight, Plus } from '@element-plus/icons-vue';
import { songs } from "@/api";
import { usePlayerStore } from "@/stores/player";
const { push, play } = usePlayerStore()
const music = reactive([
  {
    title: '时光漫谈',
    singer: '啊雾',
    album: '未知专辑',
    format: 'MP3',
    size: '1MB',
    uploadTime: '2022-11-20'
  },
  {
    title: '易燃易爆炸',
    singer: '啊雾',
    album: '未知专辑',
    format: 'M4A',
    size: '1MB',
    uploadTime: '2022-11-20'
  },
  {
    title: '喜欢你',
    singer: '啊雾',
    album: '未知专辑',
    format: 'M4A',
    size: '1MB',
    uploadTime: '2022-11-20'
  },
  {
    title: '小手拉大手',
    singer: '软软',
    album: '未知专辑',
    format: 'MP3',
    size: '1MB',
    uploadTime: '2022-11-20'
  },
  {
    title: '小尾巴',
    singer: '啊雾',
    album: '未知专辑',
    format: 'M4A',
    size: '1MB',
    uploadTime: '2022-11-20'
  },
  {
    title: '永不失联的爱',
    singer: '啊雾',
    album: '未知专辑',
    format: 'M4A',
    size: '1MB',
    uploadTime: '2022-11-20'
  }
])

async function playAll() {
  const playlist = await songs()
  push(playlist)
  play(playlist[0].id)
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(242, 242, 242);
}
.el-table {
  width: 100%;
}
</style>
