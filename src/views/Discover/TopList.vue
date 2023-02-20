<template>
  <h3>官方榜</h3>
  <div v-for="playlist in topList.slice(0, 4)" class="official-list">
    <el-image :src="playlist.coverImgUrl" />
    <el-table :data="playlist.tracks" stripe :show-header="false" tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }">
      <el-table-column type="index" width="50"/>
      <el-table-column label="标题" show-overflow-tooltip>
        <template #default="scope">
          <span>{{scope.row.first}}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手" show-overflow-tooltip>
        <template #default="scope">
          <span style="color:#919192;">{{scope.row.second}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-link class="more" :underline="false" @click="toPlayList(playlist.id)">查看更多<Right theme="outline" /></el-link>
  </div>

  <h3>全球榜</h3>
  <PlayLists :playlists="topList.slice(4)" />
</template>

<script setup lang="ts">
import {ref} from "vue";
import { Right } from "@icon-park/vue-next";
import {getTopList} from "@/api/playlist";
import {TopList} from "@/models/PlayList";
import {useRouter} from "vue-router";
import PlayLists from '@/components/PlayLists/index.vue'

const topList = ref<TopList[]>([])
getTopList().then(res => {
  topList.value = res
})

const router = useRouter()
function toPlayList(id: number) {
  router.push(`/playlist/${id}`)
}
</script>

<style scoped lang="scss">
.official-list {
  display: flex;
  margin-bottom: 20px;
  position: relative;
  .el-image {
    width: 230px;
    margin-right: 30px;
  }
  .more {
    position: absolute;
    bottom: 0;
    left: 230px;
  }
}
</style>
