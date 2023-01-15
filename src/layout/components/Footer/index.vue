<template>
  <el-footer class="flex">
    <div class="player-info flex-1">
      <PlayerSong v-if="currentPlay" />
    </div>
    <PlayerControls class="flex-1" />
    <div class="player-utils flex-1"></div>
  </el-footer>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import { toRefs } from "vue";
import PlayerSong from './PlayerSong.vue'
import PlayerControls from './PlayerControls.vue'

let { playList, currentPlay } = toRefs(usePlayerStore())

</script>

<style lang="scss" scoped>
.el-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  padding: 0;
  border-top: 1px solid rgb(224, 224, 224);
  background-color: rgb(255, 255, 255);
}
.player-info, .player-utils {
  display: flex;
  align-items: center;
}
.player-utils {
  position: relative;
  justify-items: end;
}
</style>
