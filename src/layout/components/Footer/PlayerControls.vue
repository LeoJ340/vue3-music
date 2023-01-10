<template>
  <div>
    <div class="player-controls flex">
      <el-button circle :icon="Refresh" disabled />
      <el-button circle :icon="ArrowLeftBold" disabled />
      <el-button v-if="player.paused || player.ended" circle :icon="VideoPlay" class="player-controls-play" @click="play()" />
      <el-button v-else circle :icon="VideoPause" class="player-controls-pause" @click="pause()" />
      <el-button circle :icon="ArrowRightBold" disabled />
      <el-button circle :icon="ChatLineSquare" disabled />
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
import { VideoPlay, VideoPause, ArrowLeftBold, ArrowRightBold, Refresh, ChatLineSquare } from '@element-plus/icons-vue'
import { reactive, watch, onUnmounted } from 'vue';

const srcTemp = 'https://m801.music.126.net/20230109104322/032d40ee946d5f0985d434c95e81b817/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/14096468527/8d57/c86c/b1cc/7e220f399dae56f682431535c201a37f.m4a'
const audio = new Audio(srcTemp)

const player = reactive({
  currentTime: 0,
  duration: 0,
  ended: false,
  loop: audio.loop,// default false
  muted: audio.muted,
  networkState: audio.networkState,
  paused: audio.paused,
  playbackRate: audio.playbackRate,
  readyState: audio.readyState,
  volume: audio.volume,
  sliderInput: false
})

function interval() {
  if (!player.sliderInput) {
    player.currentTime = audio.currentTime
    player.ended = audio.ended
  }
}

const timer = setInterval(interval, 1000)

watch(() => player.ended, ended => {
  if (ended) {
    setTimeout(() => {
      player.sliderInput = false
      audio.play()
    }, 1000)
  }
})

function play() {
  audio.play().then(_ => {
    player.duration = audio.duration
    player.paused = audio.paused
    player.ended = audio.ended
  })
}

function pause() {
  audio.pause()
  player.paused = audio.paused
  player.currentTime = audio.currentTime
}

function onSliderInput() {
  player.sliderInput = true
}

function onSliderChange(val: number) {
  player.sliderInput = false
  player.currentTime = val
  audio.currentTime = val
}

function useFormatTime(time: number = 0) {
  const s = Math.floor(time) % 60;
  time = Math.floor(time / 60);
  const i = time % 60;
  const ii = i < 10 ? `0${i}` : i;
  const ss = s < 10 ? `0${s}` : s;
  return ii + ':' + ss;
}

// 清除定时器
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss">
.player-controls {
  justify-content: space-around;
  margin-top: 10px;
  .el-button {
    border: none;
    &:hover {
      background-color: #fff;
      color: rgb(253, 118, 113);
    }
  }
  .player-controls-play, .player-controls-play {
    font-size: 20px;
    background-color: rgb(245, 245, 245);
    color: #000;
    &:hover {
      background-color: rgb(229, 229, 229);
      color: #000;
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
