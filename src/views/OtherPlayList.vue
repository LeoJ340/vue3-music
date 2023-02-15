<template>
  <PlayList :playlist-info="playlistInfo" :tracks="tracks" />
</template>

<script setup lang="ts">
import PlayList from "@/components/PlayList/index.vue";
import {useRoute} from "vue-router";
import {ref} from "vue";
import {getPlayList} from "@/api/playlist";
import {Tracks} from "@/models/PlayList";

const currentRoute = useRoute()
const currentPlaylistId = ref(currentRoute.params.id)

const playlistInfo = ref({})
const tracks = ref<Tracks[]>([])

getPlayList(Number(currentPlaylistId.value)).then(res => {
  playlistInfo.value = res
  tracks.value = res.tracks
})
</script>

<style scoped>

</style>
