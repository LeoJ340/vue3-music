<template>
  <div v-for="item in introduction" style="padding: 0 40px;">
    <h5 class="mb-0">{{item.ti}}</h5>
    <pre>{{item.txt}}</pre>
  </div>
  <el-empty v-if="!introduction?.length" description="暂无介绍" />
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {getArtistDesc} from "@/api/artist";
import {ref} from "vue";
import {ArtistIntroduction} from "@/models/Artist";

const currentRoute = useRoute()
const artistId = currentRoute.params.id

const introduction = ref<ArtistIntroduction[]>()

getArtistDesc(Number(artistId)).then(res => {
  introduction.value = res
})
</script>

<style scoped>

</style>
