<template>
  <div class="grid-col5" style="padding: 20px 40px;">
    <Cover v-for="mv in mvs" :key="mv.id"
           mode="vertical" :image-url="mv.imgurl" :play-count="mv.playCount" @click="toMV(mv.id)">
      <el-link :underline="false" @click="toMV(mv.id)">{{mv.name}}</el-link>
    </Cover>
  </div>
</template>

<script setup lang="ts">
import Cover from '@/components/Cover/index.vue'
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getArtistMVs} from "@/api/artist";
import {ArtistMV} from "@/models/Artist";

const currentRoute = useRoute()
const artistId = ref(currentRoute.params.id)
const mvs = ref<ArtistMV[]>()

function getData() {
  getArtistMVs(Number(artistId.value)).then(res => {
    mvs.value = res
  })
}

getData()

const router = useRouter()
function toMV(id: number) {
  router.push(`/mv/${id}`)
}

</script>

<style scoped>

</style>
