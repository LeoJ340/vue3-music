<template>
  <el-scrollbar ref="scrollbarRef" view-style="padding: 0 20px;" @scroll="watchScroll">
    <!-- 选择精选分类 -->
    <header class="flex justify-between items-center">
      <h3>精品歌单<el-link href="https://music.163.com/#/topic?id=202001" target="_blank" :underline="false" title="如何成为精品歌单？"><help theme="outline" size="18" :strokeWidth="3"/></el-link></h3>
      <el-popover placement="bottom-start" width="600" trigger="click" :effect="currentTheme === 'dark' ? 'dark' : 'light'">
        <template #reference>
          <el-button round><Filter theme="outline" size="16" :strokeWidth="3"/>{{cat}}</el-button>
        </template>
        <div class="all-cate" @click="changeCat('全部')">全部歌单</div>
        <el-divider />
        <div class="cate-list">
          <div v-for="item in highQualityCategories"
               class="cate-item" :class="{ 'active': item.name === cat }"
               @click="changeCat(item.name)">{{item.name}}</div>
        </div>
      </el-popover>
    </header>
    <!-- 歌单列表 -->
    <div class="grid-col3">
      <Cover v-for="item in playLists"
             mode="horizontal" :image-url="item.coverImgUrl" image-size="200px" :play-count="item.playCount"
             icon-placement="bottom-right" icon-transition="el-fade-in-linear" @click="toCommonPlayList(item.id)">
        <el-link :underline="false" @click="toCommonPlayList(item.id)">{{item.name}}</el-link>
        <!-- TODO：去用户页 -->
        <p class="text-12 flex">
          by {{item.creator.nickname}}
          <el-image v-if="item.creator.avatarDetail" :src="item.creator.avatarDetail?.identityIconUrl" style="margin-left: 2px; width: 15px;" />
        </p>
        <p class="text-12">{{item.copywriter}}</p>
      </Cover>
    </div>
    <!-- 无网络显示 -->
    <NetLess v-show="noNetwork" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import Cover from '@/components/Cover/index.vue'
import NetLess from '@/components/NetLess/index.vue'
import {reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {getHighQualityCategories, getHighQualityPlayLists} from "@/api/playlist";
import {HighQualityTag} from "@/models/Category";
import {PlayList} from "@/models/PlayList";
import {Help, Filter} from "@icon-park/vue-next";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/stores/app";
import {ElScrollbar} from "element-plus";
import {toCommonPlayList} from "@/router/usePush";

const { currentTheme } = storeToRefs(useAppStore())

const noNetwork = ref(false)

const highQualityCategories = ref<HighQualityTag[]>([])
getHighQualityCategories().then(res => {
  noNetwork.value = false
  highQualityCategories.value = res
}).catch((reason: string) => {
  if (reason === '网络异常') {
    noNetwork.value = true
  }
})

const currentRoute = useRoute()
const cat = ref(currentRoute.query.cat as string || '全部')
const limit = 50

const playLists = reactive<PlayList[]>([])

function getList(before?: number) {
  getHighQualityPlayLists({ cat: cat.value, limit, before }).then(res => {
    noNetwork.value = false
    playLists.push(...res.playlists)
  }).catch((reason: string) => {
    if (reason === '网络异常') {
      noNetwork.value = true
    }
  })
}

getList()

function changeCat(category: string) {
  if (category === cat.value) return
  playLists.length = 0
  cat.value = category
  getList()
}

// 滚动到底部加载
const scrollbarRef = ref<typeof ElScrollbar | null>(null)
function watchScroll(scroll: { scrollTop: number, scrollLeft: number }) {
  if (!scrollbarRef.value) return
  if (scrollbarRef.value.wrapRef.scrollHeight <= scroll.scrollTop + scrollbarRef.value?.wrapRef.offsetHeight) {
    const before: number = playLists[playLists.length - 1].updateTime
    getList(before)
  }
}
</script>

<style scoped lang="scss">
.all-cate {
  margin: 10px;
  cursor: pointer;
  &:hover {
    color: var(--player-theme-light);
  }
}
.cate-list {
  display: flex;
  flex-wrap: wrap;
  .cate-item {
    width: 80px;
    margin: 10px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: var(--player-theme-light);
    }
    &.active {
      background-color: var(--player-theme);
      color: #ffffff;
    }
  }
}
</style>
