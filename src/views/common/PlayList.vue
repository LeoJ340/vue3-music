<template>
  <PlayList v-if="playlistInfo" :playlist-info="playlistInfo" :songs="songs" />
  <el-empty v-else description="暂无数据" />
</template>

<script setup lang="ts">
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {defineAsyncComponent, ref} from "vue";
import {getPlayList} from "@/api/playlist";
import {Song} from "@/models/Song";
import {PlayList} from "@/models/PlayList";

const currentRoute = useRoute()
const currentPlaylistId = ref(currentRoute.params.id)

const playlistInfo = ref<PlayList>()
const songs = ref<Song[]>([])

function getData() {
  if (currentPlaylistId.value !== 'undefined') {
    getPlayList(Number(currentPlaylistId.value)).then(res => {
      playlistInfo.value = res
      songs.value = res.tracks
      document.title = playlistInfo.value?.name
    })
  }
}

getData()

onBeforeRouteUpdate(async to => {
  playlistInfo.value = undefined
  songs.value = []
  currentPlaylistId.value = to.params.id
  getData()
})

const PlayList = defineAsyncComponent(() => import('@/components/PlayList/index.vue'))
</script>

<style scoped>

</style>
