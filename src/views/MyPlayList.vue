<template>
  <PlayList v-if="playlistInfo" :playlist-info="playlistInfo" :songs="songs" />
  <el-empty v-else description="暂无数据" />
</template>

<script setup lang="ts">
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {computed, defineAsyncComponent, ref} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
import {Song} from "@/models/Song";
import {getPlayListTrack} from "@/api/playlist";

const router = useRouter()
const currentRoute = useRoute()
const currentPlaylistId = ref(currentRoute.params.id)

const { myPlayList } = storeToRefs(useUserStore())

const playlistInfo = computed(() => {
  return myPlayList.value.find(item => String(item.id) === currentPlaylistId.value) || null
})

const songs = ref<Song[]>([])

function getTracks() {
  if (currentPlaylistId.value !== 'undefined') {
    getPlayListTrack(Number(currentPlaylistId.value)).then(res => {
      songs.value = res
    })
  }
}

getTracks()

onBeforeRouteUpdate(to => {
  currentPlaylistId.value = to.params.id
  getTracks()
})

const PlayList = defineAsyncComponent(() => import('@/components/PlayList/index.vue'))
</script>

<style scoped>

</style>
