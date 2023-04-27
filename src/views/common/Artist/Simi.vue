<template>
  <div class="grid-col5" style="padding: 20px 40px;">
    <Cover v-for="artist in simiArtists" :key="artist.id"
           mode="vertical" :image-url="artist.img1v1Url" @click="toCommonArtist(artist.id)">
      <el-link :underline="false" @click="toCommonArtist(artist.id)">{{artist.name}}</el-link>
    </Cover>
  </div>
</template>

<script setup lang="ts">
import Cover from '@/components/Cover/index.vue'
import {ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {getSimiArtists} from "@/api/artist";
import {Artist} from "@/models/Artist";
import {toCommonArtist} from "@/router/usePush";

const currentRoute = useRoute()
const artistId = ref(currentRoute.params.id)
const simiArtists = ref<Artist[]>()

function getData() {
  getSimiArtists(Number(artistId.value)).then(res => {
    simiArtists.value = res
  })
}

getData()

onBeforeRouteUpdate(to => {
  artistId.value = to.params.id
  getData()
})
</script>

<style scoped>

</style>
