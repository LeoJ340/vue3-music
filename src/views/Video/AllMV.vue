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
    <ul v-loading="loading" element-loading-text="载入中..." class="mv-list">
      <li v-for="mv in mvList" class="mv-item" @click="toDetail(mv.id)">
        <el-image :src="mv.cover" fit="cover" />
        <div style="margin-top: 5px;">{{mv.name}}</div>
        <div class="play-count">
          <PlayOne theme="outline" size="22" :strokeWidth="2"/>
          <span>{{useFormatCount(mv.playCount)}}</span>
        </div>
      </li>
    </ul>
    <!-- 分页条 -->
    <el-pagination
        small
        background
        layout="prev, pager, next"
        :page-size="params.limit"
        v-model:current-page="params.page"
        :total="total"
        :hide-on-single-page="total < params.limit"
        @current-change="changePage"
    />
  </el-scrollbar>
</template>

<script setup lang="ts">
import {PlayOne} from "@icon-park/vue-next";
import useFormatCount from "@/utils/count";
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
const mvList = ref<MV[]>([])
const total = ref(0)

function getData() {
  loading.value = true
  mvList.value.length = 0
  getMVList(params).then(res => {
    const { data, count } = res
    if (count) {
      total.value = count
    }
    mvList.value = data
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
function toDetail(id: number) {
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
.el-pagination {
  margin: 40px;
}
</style>
