<template>
  <el-footer class="flex">
    <div class="flex-1 flex-vertical-center">
      <PlayerSong v-if="currentPlay" class="flex-1 flex-vertical-center" />
    </div>
    <div class="flex-1">
      <PlayerControls />
    </div>
    <div class="flex-1 flex-vertical-center justify-end relative">
      <PlayerUtils v-if="playList.length" />
    </div>
  </el-footer>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import { toRefs } from "vue";
import PlayerSong from './PlayerSong.vue'
import PlayerControls from './PlayerControls.vue'
import PlayerUtils from './PlayerUtils.vue'

const { playList, currentPlay } = toRefs(usePlayerStore())

</script>

<style lang="scss" scoped>
.el-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  padding: 0;
  border-top: 1px solid rgb(224, 224, 224);
  background-color: var(--player-bg);
}
</style>
