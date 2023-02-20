<template>
  <div class="player-controls">
    <!-- 播放模式 -->
    <Component class="player-controls-item" :class="{ 'disabled': disabled }"
               :is="loopType.icon" theme="outline" size="22" @click="nextLoopType"
               :title="!disabled ? loopType.text : ''" />
    <!-- 上一首 -->
    <GoStart class="player-controls-item" :class="{ 'disabled': disabled }"
             theme="outline" size="22" @click="prevPlay" :title="!disabled ? '上一首' : ''" />
    <!-- 播放|暂停 -->
    <Component :is="paused ? PlayOne : Pause"
               class="player-controls-item togglePlay" :class="{ 'disabled': disabled }"
               theme="filled" size="32" @click="togglePlay()" :title="!disabled ? (paused ? '播放' : '暂停') : ''"/>
    <!-- 下一首 -->
    <GoEnd class="player-controls-item" :class="{ 'disabled': disabled }"
           theme="outline" size="22" @click="nextPlay" :title="!disabled ? '下一首' : ''" />
    <!-- 打开歌词 -->
    <Comment class="player-controls-item disabled" theme="outline" size="22" />
  </div>
  <!-- 进度条 -->
  <div class="player-slider flex">
    <span v-show="!disabled" class="currentTime">{{useFormatSeconds(player.currentTime)}}</span>
    <el-slider :show-tooltip="false" v-model="player.currentTime" :min="0" :max="player.duration" :disabled="disabled"
               @input="onSliderInput" @change="onSliderChange" />
    <span v-show="!disabled" class="duration">{{useFormatSeconds(player.duration)}}</span>
  </div>
</template>

<script setup lang="ts">
import { GoStart, PlayOne, Pause, GoEnd, Comment } from '@icon-park/vue-next';
import { usePlayerStore } from "@/stores/player";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useFormatSeconds } from "@/utils/time";

const playerStore = usePlayerStore()

const { player, disabled, loopType } = storeToRefs(playerStore)
const { togglePlay, onSliderInput, onSliderChange, nextLoopType, nextPlay, prevPlay } = playerStore

const paused = computed(() => {
  return player.value.paused || player.value.ended
})

</script>

<style lang="scss" scoped>
.player-controls {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  .player-controls-item {
    cursor: pointer;
    color: var(--main-text);
    &:hover {
      color: var(--player-theme);
    }
    &.disabled, &.disabled:hover {
      cursor: default;
      color: rgb(166, 166, 166);
    }
    &.togglePlay {
      padding: 2px;
      border-radius: 50%;
      background-color: var(--player-toggle-bg);
      &:hover {
        background-color: var(--player-toggle-bg-hover);
        color: var(--main-text);
      }
      &.disabled, &.disabled:hover {
        background-color: var(--player-toggle-bg);
        color: rgb(166, 166, 166);
      }
    }
  }
}
.player-slider {
  color: rgb(166, 166, 166);
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
}
</style>
