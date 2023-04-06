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
      <el-button round><FolderPlus theme="outline" size="20" :strokeWidth="2"/>收藏</el-button>
    </div>
  </header>

  <el-table :data="dailySongs" stripe tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }" @row-dblclick="dblclickPlay">
    <el-table-column type="index" width="50" />
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <div style="display: flex; justify-content: space-around;">
          <el-link :underline="false" title="喜欢">
            <Like v-if="myPlayListIds.includes(scope.row.id)" theme="filled" size="20" fill="#ec4141" :strokeWidth="2"/>
            <Like v-else theme="outline" size="20" :strokeWidth="2"/>
          </el-link>
          <el-link :underline="false">
            <Download theme="outline" size="20" :strokeWidth="2"/>
          </el-link>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="标题" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{scope.row.name}}</span>
        <span v-if="scope.row.alia.length" style="color:#919192;">（{{scope.row.alia.join('')}}）</span>
      </template>
    </el-table-column>
    <el-table-column label="歌手" :show-overflow-tooltip="true">
      <template #default="scope">
        <ArtistColumn :artists="scope.row.ar" />
      </template>
    </el-table-column>
    <el-table-column label="专辑" :show-overflow-tooltip="true">
      <template #default="scope">
        <el-link :underline="false" @click="toCommonPlayList(scope.row.al.id)">{{scope.row.al.name}}</el-link>
      </template>
    </el-table-column>
    <el-table-column label="时间" width="100">
      <template #default="scope">
        <span>{{useFormatSeconds(scope.row.dt / 1000)}}</span>
      </template>
    </el-table-column>
    <!-- 空数据 -->
    <template #empty="scope">
      <el-empty description="暂无音乐" />
    </template>
  </el-table>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {getDailySongs} from "@/api/recommend";
import {Song} from "@/models/Song";
import { Calendar, PlayOne, Plus, FolderPlus, Download, Like } from '@icon-park/vue-next';
import ArtistColumn from '@/components/PlayList/ArtistColumn.vue'
import {useFormatSeconds} from "@/utils/time";
import {usePlayerStore} from "@/stores/player";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import {toCommonPlayList} from "@/router/usePush";

const dailySongs = ref<Song[]>([])
getDailySongs().then(res => {
  dailySongs.value = res
})

const { myPlayList } = storeToRefs(useUserStore())
const myPlayListIds = myPlayList.value.map(item => item.id)

// 播放全部
const { push } = usePlayerStore()
function playAll(replace: boolean = true) {
  push(dailySongs.value.filter(item => !item.noCopyrightRcmd), { replace, trigger: 'playAll' })
}

// 双击播放
function dblclickPlay(song: Song) {
  if (song.noCopyrightRcmd) return
  const starIndex = dailySongs.value.findIndex(item => item.id === song.id)
  push(dailySongs.value.filter(item => !item.noCopyrightRcmd), { replace: true, starIndex, trigger: 'doubleClick' })
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
