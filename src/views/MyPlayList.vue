<template>
  <PlayList v-if="Object.keys(playlistInfo).length" :playlist-info="playlistInfo" :songs="songs" />
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

const { hasLogin, myPlayList } = storeToRefs(useUserStore())

// 路由拦截
if (!hasLogin && currentPlaylistId.value !== 'undefined') {
  router.push(`/playlist/${currentPlaylistId.value}`)
}
const playlistInfo = computed(() => {
  const currentPlayList = myPlayList.value.find(item => String(item.id) === currentPlaylistId.value)
  if(!currentPlayList) {
    router.push(`/playlist/${currentPlaylistId.value}`)
  }
  return currentPlayList
})

const songs = ref<Song[]>([])
getTracks()

function getTracks() {
  if (currentPlaylistId.value === 'undefined') {
    songs.value = []
    return
  }
  getPlayListTrack(Number(currentPlaylistId.value)).then(res => {
    songs.value = res
  }).catch(_ => {
    songs.value = []
  })
}

onBeforeRouteUpdate(to => {
  currentPlaylistId.value = to.params.id
  getTracks()
})

const PlayList = defineAsyncComponent(() => import('@/components/PlayList/index.vue'))
</script>

<style scoped>

</style>
