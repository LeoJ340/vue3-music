<template>
  <el-footer class="flex">
    <div class="flex-1 flex-vertical-center">
      <PlayerSong v-if="currentPlay" />
    </div>
    <div class="flex-1">
      <PlayerControls />
    </div>
    <div class="flex-1 flex-vertical-center justify-end relative">
      <PlayerUtils v-if="songs.length" />
    </div>
  </el-footer>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import {storeToRefs} from "pinia";
import PlayerSong from './PlayerSong.vue'
import PlayerControls from './PlayerControls.vue'
import PlayerUtils from './PlayerUtils.vue'

const { songs, currentPlay } = storeToRefs(usePlayerStore())

</script>

<style lang="scss" scoped>
.el-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  padding: 0;
  border-top: 1px solid var(--player-border-top);
  background-color: var(--player-bg);
  z-index: 9999;
}
</style>
