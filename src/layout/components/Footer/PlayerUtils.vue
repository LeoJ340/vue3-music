<template>
  <div class="player-volume-wrapper" :title="player.volume === 0 ? '恢复音量' : '静音'">
    <Component :is="volumeIcon" theme="outline" size="22" fill="#000000" :strokeWidth="2" @click="setMute" />
    <div class="player-volume">
      <el-slider v-model="player.volume" vertical height="80px" @input="onSliderInput" />
    </div>
  </div>
  <MusicList theme="filled" size="22" fill="#000000" :strokeWidth="2" class="player-list" title="打开播放列表"/>
  <!-- 列表 -->
  <PlayList />
</template>

<script setup lang="ts">
import { VolumeSmall, VolumeNotice, VolumeMute, MusicList } from '@icon-park/vue-next';
import {computed, ref, toRefs} from "vue";
import { usePlayerStore } from "@/stores/player";
import PlayList from './PlayList.vue'

let { player, setVolume } = toRefs(usePlayerStore())
const volumeTemp = ref(60)

function onSliderInput(val: number) {
  setVolume.value(val)
}

function setMute() {
  if (player.value.volume === 0) {
    setVolume.value(volumeTemp.value)
    volumeTemp.value = 0
  } else {
    volumeTemp.value = player.value.volume
    setVolume.value(0)
  }

}

const volumeIcon = computed(() => {
  if (player.value.volume === 0) return VolumeMute
  if (player.value.volume >= 50) return VolumeNotice
  if (player.value.volume < 50) return VolumeSmall
})

</script>

<style lang="scss" scoped>
.player-volume-wrapper {
  padding: 0 20px;
  cursor: pointer;
}
.player-list {
  padding-right: 20px;
  cursor: pointer;
}
.player-volume {
  width: 22px;
  height: 100px;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 1px 1px 10px #000000;
  position: absolute;
  bottom: 45px;
  display: none;
}
.player-volume-wrapper:hover {
  .player-volume {
    display: flex;
    justify-content: center;
  }
}


</style>
