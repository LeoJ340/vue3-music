<template>
  <div class="playlist-list">
    <div v-for="playlist in playlists" class="playlist-item" @click="toPlayList(playlist.id)">
      <el-image :src="playlist.coverImgUrl" />
      <el-link :underline="false">{{playlist.name}}</el-link>
      <div class="play-count">
        <PlayOne theme="outline" size="22" :strokeWidth="2"/>
        <span>{{useFormatCount(playlist.playCount)}}</span>
      </div>
      <PlayOne class="to-play" theme="filled" size="32" :strokeWidth="2"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {PlayList} from "@/models/PlayList";
import {PlayOne} from "@icon-park/vue-next";
import useFormatCount from "@/utils/count";
import {useRouter} from "vue-router";

const { playlists } = defineProps({
  playlists: {
    type: Array as PropType<PlayList[]>,
    required: true
  }
})

const router = useRouter()
function toPlayList(id: number) {
  router.push(`/playlist/${id}`)
}
</script>

<style scoped lang="scss">
.playlist-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
  .playlist-item {
    position: relative;
    cursor: pointer;
    .play-count {
      position: absolute;
      top: 0;
      right: 5px;
      display: flex;
      align-items: center;
      color: #ffffff;
    }
    .to-play {
      position: absolute;
      top: 180px;
      right: 10px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.8);
      color: var(--player-theme);
      visibility: hidden;
      opacity: 0;
      transition: all 1s;
    }
    &:hover {
      .to-play {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>
