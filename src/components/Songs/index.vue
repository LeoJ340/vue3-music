<template>
  <el-table
      :data="songs"
      stripe tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }"
      @row-dblclick="dblclickPlay">
    <el-table-column label="" width="50" align="center">
      <template #default="scope">
        <span>{{scope.$index + 1}}</span>
      </template>
    </el-table-column>
    <!-- TODO：实现功能 -->
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <div style="display: flex; justify-content: space-around;">
          <el-link :underline="false" title="喜欢">
            <Like v-if="myLikedSongIds.includes(scope.row.id)" theme="filled" size="20" fill="#ec4141" :strokeWidth="2"/>
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
        <span v-if="scope.row.noCopyrightRcmd">无音源</span>
      </template>
    </el-table-column>
    <el-table-column label="歌手" :show-overflow-tooltip="true">
      <template #default="scope">
        <ArtistColumn :artists="scope.row.ar" />
      </template>
    </el-table-column>
    <el-table-column label="专辑" :show-overflow-tooltip="true">
      <template #default="scope">
        <el-link :underline="false" @click="toCommonAlbum(scope.row.al.id)">{{scope.row.al.name}}</el-link>
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
import ArtistColumn from './ArtistColumn.vue'
import { Download, Like } from '@icon-park/vue-next';
import {Song} from "@/models/Song";
import { usePlayerStore } from "@/stores/player";
import { useUserStore } from "@/stores/user";
import {storeToRefs} from "pinia";
import { useFormatSeconds } from "@/utils/time";
import {toCommonAlbum} from "@/router/usePush";

const props = defineProps<{ songs: Song[] }>()

const { myPlayList } = storeToRefs(useUserStore())
const myLikedSongIds = myPlayList.value.liked.tracks.map((item: Song) => item.id)

const { push } = usePlayerStore()

// 双击播放
function dblclickPlay(song: Song) {
  if (song.noCopyrightRcmd) return
  const starIndex = props.songs.findIndex(item => item.id === song.id)
  push(props.songs.filter(item => !item.noCopyrightRcmd), { replace: true, starIndex, trigger: 'doubleClick' })
}
</script>

<style lang="scss" scoped>

</style>
