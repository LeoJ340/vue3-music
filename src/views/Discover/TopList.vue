<template>
  <div v-show="!noNetwork">
    <h3>官方榜</h3>
    <div v-for="(playlist, index) in topList.slice(0, 4)" class="official-list">
      <div class="cover" @click="toCommonPlayList(playlist.id)">
        <el-image :src="playlist.coverImgUrl" />
        <PlayOne class="play-all" theme="filled" size="32" :strokeWidth="2"/>
        <span class="update-time">{{useFormatTime(playlist.updateTime, 'mm月dd日')}}更新</span>
      </div>
      <el-table :data="topTrack[index]" stripe :show-header="false" tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }">
        <el-table-column type="index" width="50">
          <template #default="scope">
            <span :style="{ color: (scope.$index < 3) ? 'var(--player-theme)' : 'initial' }">{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" :show-overflow-tooltip="true">
          <template #default="scope">
            <span>{{scope.row.name}}</span>
            <span v-if="scope.row.alia.length" style="color:#919192;">（{{scope.row.alia.join('')}}）</span>
          </template>
        </el-table-column>
        <el-table-column label="歌手" align="right" :show-overflow-tooltip="true">
          <template #default="scope">
            <ArtistColumn :artists="scope.row.ar" />
          </template>
        </el-table-column>
        <template #empty="scope">
          <el-empty description="暂无音乐" />
        </template>
      </el-table>
      <el-link class="more" :underline="false" @click="toCommonPlayList(playlist.id)">查看更多<Right theme="outline" /></el-link>
    </div>

    <h3>全球榜</h3>
    <div class="grid-col5">
      <Cover v-for="item in topList.slice(4)"
             mode="vertical" :image-url="item.coverImgUrl" :play-count="item.playCount"
             icon-placement="center" @click="toCommonPlayList(item.id)">
        <el-link :underline="false" @click="toCommonPlayList(item.id)">{{item.name}}</el-link>
      </Cover>
    </div>
  </div>
  <!-- 无网络显示 -->
  <NetLess v-show="noNetwork" />
</template>

<script setup lang="ts">
import Cover from '@/components/Cover/index.vue'
import { PlayOne, Right } from "@icon-park/vue-next";
import ArtistColumn from "@/components/Songs/ArtistColumn.vue";
import {reactive, ref} from "vue";
import {getPlayListTrack, getTopList} from "@/api/playlist";
import {TopList} from "@/models/PlayList";
import {Song} from "@/models/Song";
import {useFormatTime} from "@/utils/time";
import {toCommonPlayList} from "@/router/usePush";
import NetLess from '@/components/NetLess/index.vue'

const topList = ref<TopList[]>([])
const topTrack = reactive<Song[][]>([[], [], [], []])
const noNetwork = ref(false)
getTopList().then(res => {
  topList.value = res
  topList.value.slice(0, 4).forEach((item: TopList, index: number) => {
    getPlayListTrack(item.id, { offset: 0, limit: 5 }).then(res => {
      topTrack[index].push(...res)
    })
  })
}).catch(reason => {
  if (reason === '网络异常') {
    noNetwork.value = true
  }
})
</script>

<style scoped lang="scss">
.official-list {
  display: flex;
  margin-bottom: 40px;
  position: relative;
  .cover {
    width: 230px;
    margin-right: 30px;
    position: relative;
    cursor: pointer;
    .play-all {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.8);
      color: var(--player-theme);
      visibility: hidden;
      opacity: 0;
    }
    &:hover .play-all {
      visibility: visible;
      opacity: 1;
    }
    .update-time {
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
    }
  }
  .more {
    position: absolute;
    bottom: -20px;
    left: 230px;
  }
}
</style>
