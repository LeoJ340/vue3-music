<template>
  <PlayList v-if="Object.keys(playlistInfo).length" :playlist-info="playlistInfo" :songs="songs" />
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {defineAsyncComponent, ref} from "vue";
import {getPlayList} from "@/api/playlist";
import {Song} from "@/models/Song";

const currentRoute = useRoute()
const currentPlaylistId = ref(currentRoute.params.id)

const playlistInfo = ref({})
const songs = ref<Song[]>([])

getPlayList(Number(currentPlaylistId.value)).then(res => {
  playlistInfo.value = res
  songs.value = res.tracks
})

const PlayList = defineAsyncComponent(() => import('@/components/PlayList/index.vue'))
</script>

<style scoped>

</style>
