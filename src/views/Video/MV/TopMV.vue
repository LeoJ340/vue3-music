<template>
  <el-scrollbar view-style="padding: 0 20px;">
    <header class="flex justify-between">
      <h3 class="flex-vertical-center m-0">MV排行榜</h3>
      <div class="area-list">
        <div v-for="item in areas" class="area-item" :class="{ active: topReq.area === item }" @click="changeTopMVArea(item)">{{item}}</div>
      </div>
    </header>
    <ul v-show="!noNetwork" v-loading="loading" element-loading-text="载入中..." class="top-mv-list">
      <li v-for="(mv, no) in topMv" class="top-mv-item">
        <div class="flex-center" style="width: 10%;">
          <div>
            <h2 style="font-weight: 100; opacity: 0.6;">{{no+1 < 10 ? '0' : ''}}{{no+1}}</h2>
            <p class="text-center">
              <span v-if="no+1 === mv.lastRank">-</span>
              <Component v-else :is="no+1 > mv.lastRank ? UpSmall : DownSmall" theme="outline" size="18" :strokeWidth="3" />
            </p>
          </div>
        </div>
        <el-link :underline="false" style="width: 45%;" @click="toDetail(mv.id)">
          <el-image :src="mv.cover" fit="contain" lazy />
        </el-link>
        <div class="info">
          <p class="text-14">{{mv.name}}</p>
          <p class="text-12">{{mv.artistName}}</p>
        </div>
      </li>
    </ul>
    <!-- 无网络显示 -->
    <NetLess v-show="noNetwork" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import NetLess from '@/components/NetLess/index.vue'
import {DownSmall, UpSmall} from "@icon-park/vue-next";
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {TopMV} from "@/models/MV";
import {getTopMV} from "@/api/mv";

const currentRoute = useRoute()
const areas = ['内地','港台','欧美','日本','韩国']
const topReq = reactive({
  area: String(currentRoute.query.area),
  limit: 50
})
const topMv = ref<TopMV[]>([])
const loading = ref(false)
const noNetwork = ref(false)

function toGetTopMV() {
  loading.value = true
  topMv.value.length = 0
  getTopMV(topReq).then(res => {
    noNetwork.value = false
    topMv.value = res
  }).catch(reason => {
    if (reason === '网络异常') {
      noNetwork.value = true
    }
  }).finally(() => {
    loading.value = false
  })
}

function changeTopMVArea(area: string) {
  topReq.area = area
  toGetTopMV()
}

toGetTopMV()

const router = useRouter()
function toDetail(id: number) {
  router.push(`/mv/${id}`)
}
</script>

<style scoped lang="scss">
header {
  margin-top: 10px;
  padding: 0 20px;
}
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
