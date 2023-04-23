<template>
  <el-scrollbar ref="scrollbarRef" view-style="padding: 0 20px;" @scroll="watchScroll">
    <h3>独家播放</h3>
    <div class="grid-col3">
      <Cover v-show="!noNetwork"
             v-for="item in privateMVList"
             mode="vertical" :image-url="item.picUrl"
             icon-placement="top-left" icon-transition="only-show" @click="toMV(item.id)">
        <el-link :underline="false" @click="toMV(item.id)">{{item.name}}</el-link>
      </Cover>
      <div v-loading="loading" element-loading-text="载入中..."></div>
    </div>
    <!-- 无网络显示 -->
    <NetLess v-show="noNetwork" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import Cover from '@/components/Cover/index.vue'
import NetLess from '@/components/NetLess/index.vue'
import {ref} from "vue";
import {useRouter} from "vue-router";
import {PrivateMV} from "@/models/MV";
import {getPrivateMVList} from "@/api/mv";
import {ElScrollbar} from "element-plus";

const privateMVList = ref<PrivateMV[]>([])
const limit: number = 30
let page: number = 1
const loading = ref(false)
const noNetwork = ref(false)

function getData() {
  loading.value = true
  getPrivateMVList(limit, page).then(res => {
    noNetwork.value = false
    privateMVList.value.push(...res)
  }).catch(reason => {
    if (reason === '网络异常') {
      noNetwork.value = true
    } else {
      page--
    }
  }).finally(() => {
    loading.value = false
  })
}

getData()

// 滚动到底部加载
const scrollbarRef = ref<typeof ElScrollbar | null>(null)
function watchScroll(scroll: { scrollTop: number, scrollLeft: number }) {
  if (!scrollbarRef.value) return
  console.log(scrollbarRef.value.wrapRef.scrollHeight)
  console.log(scroll.scrollTop + scrollbarRef.value?.wrapRef.offsetHeight)
  if (scrollbarRef.value.wrapRef.scrollHeight <= scroll.scrollTop + scrollbarRef.value?.wrapRef.offsetHeight + 10) {
    page++
    getData()
  }
}

const router = useRouter()
function toMV(id: number) {
  router.push(`/mv/${id}`)
}

</script>

<style scoped>

</style>
