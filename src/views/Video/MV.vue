<template>
  <!-- 最新MV -->
  <div class="flex justify-between" style="margin-top: 10px;">
    <router-link to="/">
      <h3 class="flex-vertical-center m-0">最新MV<Right theme="outline" size="22"/></h3>
    </router-link>
    <div class="area-list">
      <div v-for="item in areas" class="area-item" :class="{ active: firstReq.area === item }" @click="changeFirstMVArea(item)">{{item}}</div>
    </div>
  </div>
  <ul class="mv-list">
    <li v-for="mv in firstMV" class="mv-item">
      <el-image :src="mv.cover" fit="cover" />
      <div style="margin-top: 5px;">{{mv.name}}</div>
      <div class="play-count">
        <PlayOne theme="outline" size="22" :strokeWidth="2"/>
        <span>{{useFormatCount(mv.playCount)}}</span>
      </div>
    </li>
  </ul>
  <!-- 网易出品 -->
  <div class="flex justify-between" style="margin-top: 10px;">
    <router-link to="/">
      <h3 class="flex-vertical-center m-0">网易出品<Right theme="outline" size="22"/></h3>
    </router-link>
  </div>
  <ul class="mv-list">
    <li v-for="mv in exclusiveMV" class="mv-item">
      <el-image :src="mv.cover" fit="contain" />
      <div style="margin-top: 5px;">{{mv.name}}</div>
      <div class="play-count">
        <PlayOne theme="outline" size="22" :strokeWidth="2"/>
        <span>{{useFormatCount(mv.playCount)}}</span>
      </div>
    </li>
  </ul>
  <!-- MV排行榜 -->
  <div class="flex justify-between" style="margin-top: 10px;">
    <router-link to="/">
      <h3 class="flex-vertical-center m-0">MV排行榜<Right theme="outline" size="22"/></h3>
    </router-link>
    <div class="area-list">
      <div v-for="item in areas" class="area-item" :class="{ active: topReq.area === item }" @click="changeTopMVArea(item)">{{item}}</div>
    </div>
  </div>
  <ul class="top-mv-list">
    <li v-for="(mv, no) in topMv" class="top-mv-item">
      <div class="flex-center" style="width: 10%;">
        <div>
          <span>{{no+1}}</span>
          <p class="text-center">-</p>
        </div>
      </div>
      <div style="width: 45%;">
        <el-image :src="mv.cover" fit="contain" />
      </div>
      <div class="info">
        <p class="text-14">{{mv.name}}</p>
        <p class="text-12">{{mv.artistName}}</p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {Right, PlayOne} from "@icon-park/vue-next";
import {getExclusiveMV, getFirstMV, getTopMV} from "@/api/mv";
import useFormatCount from "@/utils/count";
import {ref} from "vue";
import {MV, TopMV} from "@/models/MV";

const areas = ['内地','港台','欧美','日本','韩国']

/**
 * 最新MV
 */
const firstReq = {
  area: '内地',
  limit: 8
}

const firstMV = ref<MV[]>([])

function toGetFirstMV() {
  getFirstMV(firstReq).then(res => {
    firstMV.value = res
  })
}

toGetFirstMV()

function changeFirstMVArea(area: string) {
  firstReq.area = area
  toGetFirstMV()
}

/**
 * 网易出品MV
 */
const exclusiveMV = ref<MV[]>([])

getExclusiveMV(8, 1).then(res => {
  exclusiveMV.value = res
})

/**
 * MV排行榜
 */
const topReq = {
  area: '内地',
  limit: 10
}
const topMv = ref<TopMV[]>([])

function toGetTopMV() {
  getTopMV(topReq).then(res => {
    topMv.value = res
  })
}

function changeTopMVArea(area: string) {
  topReq.area = area
  toGetTopMV()
}

toGetTopMV()

</script>

<style scoped lang="scss">
.area-list {
  display: flex;
  .area-item {
    width: 60px;
    text-align: center;
    cursor: pointer;
    &.active {
      color: var(--player-theme);
    }
  }
}
.mv-list {
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 200px;
  grid-gap: 15px;
  .mv-item {
    position: relative;
    cursor: pointer;
    .el-image {
      width: 100%;
      height: 80%;
    }
    .play-count {
      position: absolute;
      top: 0;
      right: 5px;
      display: flex;
      align-items: center;
      color: #ffffff;
    }
  }
}
.top-mv-list {
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .top-mv-item {
    display: flex;
    box-sizing: border-box;
    width: 50%;
    padding: 20px 20px 20px 0;
    border-right: 0.5px solid;
    &:nth-child(2n) {
      border-right: none;
    }
    .info {
      width: 45%;
      p {
        margin-left: 10px;
      }
    }
  }
}
</style>
