<template>
  <div class="player-volume-wrapper" :title="player.volume === 0 ? '恢复音量' : '静音'">
    <Component :is="volumeIcon" theme="outline" size="22" :strokeWidth="2" @click="setMute" />
    <div class="player-volume">
      <el-slider v-model="player.volume" vertical height="80px" @input="onSliderInput" />
    </div>
  </div>
  <MusicList theme="filled" size="22" :strokeWidth="2"
             class="player-list" :title="`${isShowList ? '关闭' : '打开'}播放列表`" @click="showList"/>
  <!-- 列表 -->
  <PlayList v-show="isShowList" />
</template>

<script setup lang="ts">
import { VolumeSmall, VolumeNotice, VolumeMute, MusicList } from '@icon-park/vue-next';
import { computed, ref } from "vue";
import { usePlayerStore } from "@/stores/player";
import PlayList from './PlayList.vue'

const { player, setVolume } = usePlayerStore()
const volumeTemp = ref(60)

function onSliderInput(val: number) {
  setVolume(val)
}

function setMute() {
  if (player.volume === 0) {
    setVolume(volumeTemp.value)
    volumeTemp.value = 0
  } else {
    volumeTemp.value = player.volume
    setVolume(0)
  }

}

const volumeIcon = computed(() => {
  if (player.volume === 0) return VolumeMute
  if (player.volume >= 50) return VolumeNotice
  if (player.volume < 50) return VolumeSmall
})

const isShowList = ref(false)
function showList() {
  isShowList.value = !isShowList.value
}
</script>

<style lang="scss" scoped>
.player-volume-wrapper {
  padding: 0 20px;
  cursor: pointer;
  color: var(--main-text);
}
.player-list {
  padding-right: 20px;
  cursor: pointer;
  color: var(--main-text);
}
.player-volume {
  width: 22px;
  height: 100px;
  background-color: var(--player-bg);
  border-radius: 3px;
  box-shadow: 0 0 10px #D1D1D1;
  position: absolute;
  bottom: 45px;
  display: none;
}
.player-volume-wrapper:hover {
  .player-volume {
    display: flex;
    justify-content: center;
    z-index: 1;
  }
}


</style>
