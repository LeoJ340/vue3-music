<template>
  <el-scrollbar view-style="padding: 0 20px;">
    <header class="flex justify-between" style="margin: 25px 0;">
      <h3 class="flex-vertical-center m-0">全部MV</h3>
    </header>
    <!-- 筛选条件 -->
    <div class="screening-condition">
      <span>地区:</span>
      <span v-for="item in areas" class="condition-item" :class="{ active: item === params.area }">
      <el-link :underline="false" @click="selectArea(item)">{{item}}</el-link>
    </span>
    </div>
    <div class="screening-condition">
      <span>类型:</span>
      <span v-for="item in types" class="condition-item" :class="{ active: item === params.type }">
      <el-link :underline="false" @click="selectType(item)">{{item}}</el-link>
    </span>
    </div>
    <div class="screening-condition">
      <span>排序:</span>
      <span v-for="item in orders" class="condition-item" :class="{ active: item === params.order }">
      <el-link :underline="false" @click="selectOrder(item)">{{item}}</el-link>
    </span>
    </div>
    <!-- MV列表 -->
    <div v-show="!noNetwork" v-loading="loading" element-loading-text="载入中..." class="mv-list">
      <Cover v-for="item in mvList" mode="vertical"
             :image-url="item.cover" :play-count="item.playCount" @click="toMV(item.id)">
        <el-link :underline="false" @click="toMV(item.id)">{{item.name}}</el-link>
        <div>
          <ArtistColumn :artists="item.artists" />
        </div>
      </Cover>
    </div>
    <!-- 分页条 -->
    <el-pagination
        v-show="!noNetwork"
        small
        background
        layout="prev, pager, next"
        :page-size="params.limit"
        v-model:current-page="params.page"
        :total="total"
        :hide-on-single-page="total < params.limit"
        @current-change="changePage"
    />
    <!-- 无网络显示 -->
    <NetLess v-show="noNetwork" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import Cover from '@/components/Cover/index.vue'
import ArtistColumn from '@/components/Songs/ArtistColumn.vue'
import NetLess from '@/components/NetLess/index.vue'
import {useRoute, useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {getMVList} from "@/api/mv";
import {MV} from "@/models/MV";

const areas = ['全部', '内地','港台','欧美','日本','韩国']
const types = ['全部', '官方版', '原声', '现场版', '网易出品']
const orders = ['上升最快', '最热', '最新']

const currentRoute = useRoute()
const { area, type, order } = currentRoute.query
const params = reactive({
  area: area ? String(area) : '全部',
  type: type ? String(type) : '全部',
  order: order ? String(order) : '最新',
  limit: 50,
  page: 1
})

const loading = ref(false)
const noNetwork = ref(false)
const mvList = ref<MV[]>([])
const total = ref(0)

function getData() {
  loading.value = true
  mvList.value.length = 0
  getMVList(params).then(res => {
    noNetwork.value = false
    const { data, count } = res
    if (count) {
      total.value = count
    }
    mvList.value = data
  }).catch((reason: string) => {
    if (reason === '网络异常') {
      noNetwork.value = true
    }
  }).finally(() => {
    loading.value = false
  })
}

getData()

function selectArea(area: string) {
  params.page = 1
  params.area = area
  getData()
}

function selectType(type: string) {
  params.page = 1
  params.type = type
  getData()
}

function selectOrder(order: string) {
  params.page = 1
  params.order = order
  getData()
}

function changePage(page: number) {
  params.page = page
  getData()
}

const router = useRouter()
function toMV(id: number) {
  router.push(`/mv/${id}`)
}
</script>

<style scoped lang="scss">
.screening-condition {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  .w-50 {
    width: 50px;
  }
  .condition-item {
    width: 80px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    &:last-child {
      border-right: none;
    }
  }
  .active {
    .el-link {
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
.el-pagination {
  margin: 40px;
}
</style>
