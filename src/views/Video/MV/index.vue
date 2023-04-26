<template>
  <!-- 最新MV -->
  <div class="flex justify-between" style="margin-top: 10px;">
    <router-link :to="`/allMV?area=${firstReq.area}`">
      <h3 class="flex-vertical-center m-0">最新MV<Right theme="outline" size="22"/></h3>
    </router-link>
    <div class="area-list">
      <div v-for="item in areas" class="area-item" :class="{ active: firstReq.area === item }" @click="changeFirstMVArea(item)">{{item}}</div>
    </div>
  </div>
  <div class="mv-list">
    <Cover v-for="item in firstMV" mode="vertical"
           :image-url="item.cover" :play-count="item.playCount" @click="toMV(item.id)">
      <el-link :underline="false" @click="toMV(item.id)">{{item.name}}</el-link>
      <div>
        <ArtistColumn :artists="item.artists" />
      </div>
    </Cover>
  </div>
  <!-- 网易出品 -->
  <div class="flex justify-between" style="margin-top: 10px;">
    <router-link to="/allMV?type=网易出品">
      <h3 class="flex-vertical-center m-0">网易出品<Right theme="outline" size="22"/></h3>
    </router-link>
  </div>
  <div class="mv-list">
    <Cover v-for="item in exclusiveMV" mode="vertical"
           :image-url="item.cover" :play-count="item.playCount" @click="toMV(item.id)">
      <el-link :underline="false" @click="toMV(item.id)">{{item.name}}</el-link>
    </Cover>
  </div>
  <!-- MV排行榜 -->
  <div class="flex justify-between" style="margin-top: 30px;">
    <router-link :to="`/topMV?area=${topReq.area}`">
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
          <h2 style="font-weight: 100; opacity: 0.6;">{{no+1 < 10 ? '0' : ''}}{{no+1}}</h2>
          <div class="text-center">
            <span v-if="no+1 === mv.lastRank">-</span>
            <Component
                v-else
                :is="no+1 > mv.lastRank ? UpSmall : DownSmall"
                theme="outline" size="18" :strokeWidth="3"
            />
          </div>
        </div>
      </div>
      <el-link :underline="false" style="width: 45%;" @click="toMV(mv.id)">
        <el-image :src="mv.cover" fit="contain" lazy />
      </el-link>
      <div class="info">
        <p class="text-14">{{mv.name}}</p>
        <p class="text-12">{{mv.artistName}}</p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import Cover from '@/components/Cover/index.vue'
import ArtistColumn from '@/components/Songs/ArtistColumn.vue'
import {Right, UpSmall, DownSmall} from "@icon-park/vue-next";
import {getExclusiveMV, getFirstMV, getTopMV} from "@/api/mv";
import {MV, TopMV} from "@/models/MV";

const areas = ['内地','港台','欧美','日本','韩国']

/**
 * 最新MV
 */
const firstReq = reactive({
  area: '内地',
  limit: 8
})

const firstMV = ref<MV[]>([])

function toGetFirstMV() {
  getFirstMV(firstReq).then(res => {
    firstMV.value = res
  }).catch((reason: string) => {
    if (reason === '网络异常') {
      ElMessage({
        message: '系统异常',
        type: 'error',
        duration: 1000,
        center: true
      })
    }
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

getExclusiveMV({ limit: 8, page: 1 }).then(res => {
  exclusiveMV.value = res
})

/**
 * MV排行榜
 */
const topReq = reactive({
  area: '内地',
  limit: 10
})
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

const router = useRouter()
function toMV(id: number) {
  router.push(`/mv/${id}`)
}

</script>

<style scoped lang="scss">
.area-list {
  display: flex;
  .area-item {
    width: 60px;
    text-align: center;
    cursor: pointer;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    &:last-child {
      border-right: none;
    }
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
  grid-gap: 30px;
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    &:nth-child(2n) {
      border-right: none;
    }
    &:nth-last-child(1), &:nth-last-child(2) {
      border-bottom: none;
    }
    .i-icon-up-small {
      color: rgb(236, 65, 65);
    }
    .i-icon-down-small {
      color: rgb(44, 119, 202);
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
