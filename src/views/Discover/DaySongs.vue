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

  <el-table :data="dailySongs" stripe tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }">
    <el-table-column type="index" width="50" />
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <div style="display: flex; justify-content: space-around;">
          <el-link :underline="false">
            <Like theme="filled" size="20" fill="#ec4141" :strokeWidth="2"/>
          </el-link>
          <el-link :underline="false">
            <Download theme="outline" size="20" :strokeWidth="2"/>
          </el-link>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="标题" show-overflow-tooltip>
      <template #default="scope">
        <span>{{scope.row.name}}</span>
        <span v-if="scope.row.alia.length" style="color:#919192;">（{{scope.row.alia.join('')}}）</span>
      </template>
    </el-table-column>
    <el-table-column label="歌手" show-overflow-tooltip>
      <template #default="scope">
        <span>{{scope.row.ar.map(ar => ar.name).join('/')}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="al.name" label="专辑" show-overflow-tooltip />
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
import {recommendSongs} from "@/api/recommend";
import {Song} from "@/models/Song";
import { Calendar, PlayOne, Plus, FolderPlus, Download, Like } from '@icon-park/vue-next';
import {useFormatSeconds} from "@/utils/time";
import {usePlayerStore} from "@/stores/player";

const dailySongs = ref<Song[]>([])
recommendSongs().then(res => {
  dailySongs.value = res
})

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
