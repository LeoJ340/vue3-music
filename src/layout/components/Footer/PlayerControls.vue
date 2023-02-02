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
               class="togglePlay" :class="{ 'disabled': disabled }"
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
import { computed, toRefs } from "vue";
import { useFormatSeconds } from "@/utils/time";

let {
  player,
  disabled, loopType,
  togglePlay, onSliderInput, onSliderChange, nextLoopType, nextPlay, prevPlay
} = toRefs(usePlayerStore())

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
    color: var(--player-text);
    &:hover {
      background-color: var(--player-bg);
      color: var(--player-controls);
    }
    &.disabled, &.disabled:hover {
      cursor: default;
      background-color: var(--player-bg);
      color: rgb(166, 166, 166);
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
    &.disabled, &.disabled:hover {
      cursor: default;
      background-color: var(--player-toggle-bg-disable);
      color: rgb(166, 166, 166);
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
