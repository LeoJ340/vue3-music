<template>
  <el-image :src="currentPlay.al.picUrl" />
  <div style="color: var(--main-text)">
    <div class="text-14">
      {{currentPlay.name}}
      <span v-show="currentPlay.alia.length" style="color:#919192;">（{{currentPlay.alia.join('')}}）</span>
    </div>
    <div class="text-12">
      <ArtistColumn :artists="currentPlay.ar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArtistColumn from '@/components/Songs/ArtistColumn.vue'
import { usePlayerStore } from "@/stores/player";
import {storeToRefs} from "pinia";

const { currentPlay } = storeToRefs(usePlayerStore())
</script>

<style lang="scss" scoped>
.el-image {
  width: 50px;
  height: 50px;
  margin: 0 10px;
}
</style>
