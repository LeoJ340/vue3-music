<template>
  <div>
    <div class="player-controls flex">
      <GoStart class="player-controls-item" theme="outline" size="24"/>
      <PlayOne v-if="player.paused || player.ended" class="togglePlay"
               theme="filled" size="32" @click="togglePlay()" :disabled="!player.currentId && !playList.length"/>
      <Pause v-else class="togglePlay" theme="filled" size="32" @click="togglePlay()"/>
      <GoEnd class="player-controls-item" theme="outline" size="24"/>
    </div>
    <div class="player-slider flex">
      <span class="currentTime">{{useFormatTime(player.currentTime)}}</span>
      <el-slider :show-tooltip="false" v-model="player.currentTime" :min="0" :max="player.duration"
                 @input="onSliderInput" @change="onSliderChange" />
      <span class="duration">{{useFormatTime(player.duration)}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GoStart, PlayOne, Pause, GoEnd } from '@icon-park/vue-next';
import { usePlayerStore } from "@/stores/player";

const { playList, player, togglePlay, onSliderInput, onSliderChange } = usePlayerStore()

function useFormatTime(time: number = 0) {
  const s = Math.floor(time) % 60;
  time = Math.floor(time / 60);
  const i = time % 60;
  const ii = i < 10 ? `0${i}` : i;
  const ss = s < 10 ? `0${s}` : s;
  return ii + ':' + ss;
}

</script>

<style lang="scss">
.player-controls {
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  .player-controls-item {
    cursor: pointer;
    color: #000000;
    &:hover {
      background-color: #fff !important;
      color: rgb(253, 118, 113) !important;
    }
  }
  .togglePlay {
    cursor: pointer;
    padding: 2px;
    border-radius: 50%;
    background-color: rgb(245, 245, 245);
    &:hover {
      background-color: rgb(229, 229, 229);
    }
  }
}
.player-slider {
  .currentTime, .duration {
    line-height: 30px;
    font-size: 12px;
  }
  .currentTime {
    margin-right: 5px;
  }
  .duration {
    margin-left: 5px;
  }
  .el-slider {
    height: 10px;
    margin-top: 10px;
    .el-slider__runway, .el-slider__bar {
      height: 2px;
      border-radius: 0;
    }
    .el-slider__button-wrapper {
      width: 10px;
      height: 10px;
      top: -9.5px;
      display: none;
    }
    .el-slider__runway:hover {
      .el-slider__button-wrapper {
        display: block;
      }
    }
    .el-slider__button {
      width: 8px;
      height: 8px;
    }
  }
}
</style>
