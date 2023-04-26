<template>
  <header v-show="!noNetwork">
    <div class="flex-vertical-center justify-between">
      <div class="flex-vertical-center">
        <h3 class="m-0">每日音乐推荐</h3>
        <span class="text-14" style="margin-left: 10px;">共{{count}}首</span>
      </div>
      <el-link :underline="false" type="primary" disabled>清空列表</el-link>
    </div>
    <div class="flex" style="margin: 15px 0;">
      <el-button-group>
        <el-button round type="primary"><PlayOne theme="filled" size="22" @click="playAll"/>播放全部</el-button>
        <el-button round type="primary"><Plus theme="filled" size="20" :strokeWidth="3" @click="playAll(false)"/></el-button>
      </el-button-group>
    </div>
  </header>

  <!-- 歌曲列表 -->
  <Songs v-show="!noNetwork" :songs="recentSongs" />
  <!-- 无网络显示 -->
  <NetLess v-show="noNetwork" />
</template>

<script setup lang="ts">
import { PlayOne, Plus } from '@icon-park/vue-next';
import Songs from '@/components/Songs/index.vue'
import NetLess from '@/components/NetLess/index.vue'
import {ref} from "vue";
import {getRecentSongs} from "@/api/song";
import {Song} from "@/models/Song";
import {usePlayerStore} from "@/stores/player";

const noNetwork = ref(false)
const recentSongs = ref<Song[]>([])
const count = ref<number>(0)

getRecentSongs().then(res => {
  noNetwork.value = false
  const { total, songs } = res
  count.value = total
  recentSongs.value = songs
}).catch(reason => {
  if (reason === '网络异常') {
    noNetwork.value = true
  }
})

// 播放全部
const { push } = usePlayerStore()
function playAll(replace: boolean = true) {
  push(recentSongs.value.filter(item => !item.noCopyrightRcmd), { replace, trigger: 'playAll' })
}

</script>

<style scoped lang="scss">
header {
  margin-top: 20px;
  margin-left: 20px;
  padding-bottom: 10px;
}
.i-icon-calendar {
  font-size: 100px;
  color: var(--player-theme);
}
</style>
