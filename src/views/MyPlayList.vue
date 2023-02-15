<template>
  <PlayList :playlist-info="playlistInfo" :tracks="tracks" />
</template>

<script setup lang="ts">
import PlayList from "@/components/PlayList/index.vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
import {Tracks} from "@/models/PlayList";
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

const tracks = ref<Tracks[]>([])
getTracks()

function getTracks() {
  if (currentPlaylistId.value === 'undefined') {
    tracks.value = []
    return
  }
  getPlayListTrack(Number(currentPlaylistId.value)).then(res => {
    tracks.value = res
  }).catch(_ => {
    tracks.value = []
  })
}

onBeforeRouteUpdate(to => {
  currentPlaylistId.value = to.params.id
  getTracks()
})
</script>

<style scoped>

</style>
