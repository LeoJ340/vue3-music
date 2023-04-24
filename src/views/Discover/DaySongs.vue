<template>
  <header>
    <div class="flex">
      <Calendar theme="outline" />
      <div class="flex-horizontal-center flex-column" style="margin-left: 20px;">
        <h3 class="m-0">每日音乐推荐</h3>
        <p class="m-0 text-12">根据你的音乐口味生成，每天6:00更新</p>
      </div>
    </div>
    <div class="flex" style="margin: 15px 0;">
      <el-button-group>
        <el-button round type="primary"><PlayOne theme="filled" size="22" @click="playAll"/>播放全部</el-button>
        <el-button round type="primary"><Plus theme="filled" size="20" :strokeWidth="3" @click="playAll(false)"/></el-button>
      </el-button-group>
      <el-button round @click="selectPlayList" :disabled="!dailySongs.length"><FolderPlus theme="outline" size="20" :strokeWidth="2"/>收藏全部</el-button>
    </div>
  </header>

  <!-- 歌曲列表 -->
  <Songs :songs="dailySongs" />
</template>

<script setup lang="ts">
import {ref} from "vue";
import {getDailySongs} from "@/api/recommend";
import {Song} from "@/models/Song";
import { Calendar, PlayOne, Plus, FolderPlus } from '@icon-park/vue-next';
import Songs from '@/components/Songs/index.vue'
import {usePlayerStore} from "@/stores/player";
import { toPlayList } from "@/components/ToPlayList";

const noNetwork = ref(false)

const dailySongs = ref<Song[]>([])
getDailySongs().then(res => {
  dailySongs.value = res
}).catch(reason => {
  if (reason === '网络异常') {
    noNetwork.value = true
  }
})

function selectPlayList() {
  toPlayList(dailySongs.value.map(item => item.id))
}

// 播放全部
const { push } = usePlayerStore()
function playAll(replace: boolean = true) {
  push(dailySongs.value.filter(item => !item.noCopyrightRcmd), { replace, trigger: 'playAll' })
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
