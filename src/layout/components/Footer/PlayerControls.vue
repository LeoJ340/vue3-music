<template>
  <div>
    <div class="player-controls flex">
      <!-- 播放模式 -->
      <Component class="player-controls-item" :class="{ 'disabled': disabled }"
                 :is="loopType.icon" theme="outline" size="22" @click="nextLoopType"
                 :title="!disabled ? loopType.text : ''" />
      <!-- 上一首 -->
      <GoStart class="player-controls-item" :class="{ 'disabled': disabled }"
               theme="outline" size="22" @click="prevPlay" :title="!disabled ? '上一首' : ''" />
      <!-- 播放模式 -->
      <PlayOne v-if="player.paused || player.ended" class="togglePlay" :class="{ 'disabled': disabled }"
               theme="filled" size="32" @click="togglePlay()" :title="!disabled ? '播放' : ''" />
      <Pause v-else class="togglePlay" :class="{ 'disabled': disabled }"
             theme="filled" size="32" @click="togglePlay()" :title="!disabled ? '暂停' : ''" />
      <!-- 下一首 -->
      <GoEnd class="player-controls-item" :class="{ 'disabled': disabled }"
             theme="outline" size="22" @click="nextPlay" :title="!disabled ? '下一首' : ''" />
      <!-- 打开歌词 -->
      <Comment class="player-controls-item disabled" theme="outline" size="22" />
    </div>
    <!-- 进度条 -->
    <div class="player-slider flex">
      <span v-show="!disabled" class="currentTime">{{useFormatTime(player.currentTime)}}</span>
      <el-slider :show-tooltip="false" v-model="player.currentTime" :min="0" :max="player.duration"
                 @input="onSliderInput" @change="onSliderChange" />
      <span v-show="!disabled" class="duration">{{useFormatTime(player.duration)}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GoStart, PlayOne, Pause, GoEnd, Comment } from '@icon-park/vue-next';
import { usePlayerStore } from "@/stores/player";
import { toRefs } from "vue";
import { useFormatTime } from "@/utils/time";

let {
  player,
  disabled, loopType,
  togglePlay, onSliderInput, onSliderChange, nextLoopType, nextPlay, prevPlay
} = toRefs(usePlayerStore())

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
      background-color: #fff;
      color: rgb(253, 118, 113);
    }
  }
  .disabled, .disabled:hover {
    cursor: default;
    background-color: #ffffff;
    color: rgb(166, 166, 166);
  }
  .togglePlay {
    cursor: pointer;
    padding: 2px;
    border-radius: 50%;
    background-color: rgb(245, 245, 245);
    &:hover {
      background-color: rgb(229, 229, 229);
    }
    &.disabled:hover {
      background-color: rgb(245, 245, 245);
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
