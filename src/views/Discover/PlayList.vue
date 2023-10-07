<template>
  <!-- 精选歌单 -->
  <div v-if="highQualityPlayList" class="top-playlist flex" @click="toHighQualityPlayList">
    <div class="top-playlist-bg" :style="{ backgroundImage: `url(${highQualityPlayList.coverImgUrl})` }"></div>
    <el-image :src="highQualityPlayList.coverImgUrl" />
    <div class="cover-info">
      <el-button round><CrownThree theme="outline" />精选歌单</el-button>
      <p>{{highQualityPlayList.name}}</p>
      <span class="text-12">{{highQualityPlayList.copywriter}}</span>
    </div>
  </div>
  <!-- 分类选择 -->
  <div v-show="!noNetwork" class="flex justify-between items-end" style="margin: 15px 0;">
    <el-popover placement="bottom-start" width="auto" trigger="click" :effect="currentTheme === 'dark' ? 'dark' : 'light'">
      <template #reference>
        <el-button round>{{currentCategoryName}}<Right theme="outline"/></el-button>
      </template>
      <div style="margin: 10px;">全部歌单</div>
      <el-divider />
      <div v-for="item in allCategory" class="sub-category">
        <span :class="[ 'row', `row-${item.row}` ]"><Component :is="item.icon" theme="outline" size="24" :strokeWidth="3"/>{{item.name}}</span>
        <el-link v-for="subCategory in item.sub"
                 :class="{ active: subCategory.name === currentCategoryName }"
                 :underline="false"
                 @click="changeCategory(subCategory.name)">
          {{subCategory.name}}
          <span v-if="subCategory.hot" class="badge">hot</span>
        </el-link>
      </div>
    </el-popover>
    <div class="hot-category">
      <el-link v-for="category in hotCategories"
               :class="{ active: category.name === currentCategoryName }"
               :underline="false"
               @click="changeCategory(category.name)">
        {{category.name}}
      </el-link>
    </div>
  </div>
  <!-- 歌单列表 -->
  <div v-loading="loading" element-loading-text="载入中..." class="grid-col5">
    <Cover v-for="item in playlistPage.list"
           mode="vertical" :image-url="item.coverImgUrl" :play-count="item.playCount"
           icon-placement="bottom-right" icon-transition="el-fade-in-linear" @click="toCommonPlayList(item.id)">
      <el-link :underline="false" @click="toCommonPlayList(item.id)">{{item.name}}</el-link>
    </Cover>
  </div>
  <!-- 分页条 -->
  <el-pagination
      v-show="!noNetwork"
      small
      background
      layout="prev, pager, next"
      :page-size="playlistPage.size"
      v-model:current-page="playlistPage.page"
      :total="playlistPage.total"
      :hide-on-single-page="playlistPage.total < playlistPage.size"
      @current-change="changePage"
  />
  <!-- 无网络显示 -->
  <NetLess v-show="noNetwork" />
</template>

<script setup lang="ts">
import Cover from '@/components/Cover/index.vue'
import NetLess from '@/components/NetLess/index.vue'
import {CrownThree, Right ,Earth, Piano, Cup, SlightlySmilingFace, GridTwo} from "@icon-park/vue-next";
import {reactive, ref, markRaw, Raw, watch} from "vue";
import {
  getHighQualityCategories,
  getHotCategories,
  getSubCategories,
  getPlaylists,
  getHighQualityPlayLists
} from "@/api/playlist";
import {Category, HighQualityTag, HotCategory} from "@/models/Category";
import {PlayList} from "@/models/PlayList";
import type {Icon} from "@icon-park/vue-next/lib/runtime";
import {useRouter} from "vue-router";
import {useAppStore} from "@/stores/app";
import {storeToRefs} from "pinia";
import {toCommonPlayList} from "@/router/usePush";

const { currentTheme } = storeToRefs(useAppStore())
const router = useRouter()

// 精选歌单
const highQualityPlayList = ref<PlayList>()
const currentCategoryName = ref('全部歌单')
const allCategory = reactive<{ name: string; icon: Raw<Icon>; sub: Category[]; row: number }[]>([
  {
    name: '语种',
    icon: markRaw(Earth),
    sub: [],
    row: 3
  },
  {
    name: '风格',
    icon: markRaw(Piano),
    sub: [],
    row: 6
  },
  {
    name: '场景',
    icon: markRaw(Cup),
    sub: [],
    row: 4
  },
  {
    name: '情感',
    icon: markRaw(SlightlySmilingFace),
    sub: [],
    row: 4
  },
  {
    name: '主题',
    icon: markRaw(GridTwo),
    sub: [],
    row: 5
  }
])

const playlistPage = reactive<{ list: PlayList[]; page: number; size: number; total: number }>({
  list: [],
  page: 1,
  size: 50,
  total: 0
})

const loading = ref(false)
const noNetwork = ref(false)

const hotCategories = ref<HotCategory[]>([])
const highQualityCategories = ref<HighQualityTag[]>([])

// 获取列表数据
function getList() {
  loading.value = true
  getPlaylists({ cat: currentCategoryName.value, limit: playlistPage.size, page: playlistPage.page }).then(res => {
    noNetwork.value = false
    const { playlists, total } = res
    playlistPage.total = total
    playlistPage.list = playlists
  }).catch((reason: string) => {
    if (reason === '网络异常') {
      noNetwork.value = true
    }
  }).finally(() => {
    loading.value = false
  })
}

// 初始化分类数据
async function init() {
  // 异步获取全部分类
  getSubCategories().then(res => {
    noNetwork.value = false
    allCategory.forEach((item, index) => {
      item.sub = res.filter(sub => sub.category === index)
    })
  }).catch(reason => {
    if (reason === '网络异常') {
      noNetwork.value = true
    }
  })
  // 获取热门分类、精选分类
  const initRes = await Promise.allSettled<[HotCategory[], HighQualityTag[]]>([await getHotCategories(), await getHighQualityCategories()]) as PromiseFulfilledResult<HotCategory[] | HighQualityTag[]>[]
  hotCategories.value = initRes[0]?.value as HotCategory[]
  highQualityCategories.value = initRes[1]?.value as HighQualityTag[]
  currentCategoryName.value = hotCategories.value[0].name
  getList()
}

init()

watch(currentCategoryName, val => {
  // 监听当前分类是否属于精选分类
  if (highQualityCategories.value.map(item => item.name).includes(val)) {
    // 获取精选歌单第一项
    getHighQualityPlayLists({ cat: val, limit: 1 }).then(res => {
      highQualityPlayList.value = res.playlists[0]
    }).catch(reason => {
      if (reason === '网络异常') {
        noNetwork.value = true
      }
    })
  } else {
    highQualityPlayList.value = undefined
  }
})

function toHighQualityPlayList() {
  router.push({
    path: '/highQualityPlayList',
    query: highQualityCategories.value.map(item => item.name).includes(currentCategoryName.value) ? { cat: currentCategoryName.value } : {}
  })
}

function changeCategory(category: string) {
  playlistPage.page = 1
  currentCategoryName.value = category
  getList()
}

function changePage(page: number) {
  playlistPage.page = page
  getList()
}
</script>

<style scoped lang="scss">
.top-playlist {
  cursor: pointer;
  padding: 15px;
  color: #ffffff;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
  border-radius: 7px;
  .top-playlist-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    margin-left: -15px;
    margin-top: -15px;
    filter: blur(10px);
  }
  .el-image {
    width: 200px;
    margin-right: 20px;
  }
  .cover-info {
    position: absolute;
    left: 240px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 1;
    .el-button, .el-button:hover{
      color: rgb(231, 170, 90);
      border-color: rgb(231, 170, 90);
      background-color: #ffffff;
    }
  }
}
.sub-category {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  .row {
    grid-row-start: 1;
    .i-icon {
      margin-right: 5px;
    }
  }
  .row-3 {
    grid-row-end: 3;
  }
  .row-4 {
    grid-row-end: 4;
  }
  .row-5 {
    grid-row-end: 5;
  }
  .row-6 {
    grid-row-end: 6;
  }
  .active, .active:hover {
    color: var(--player-theme);
  }
  .badge {
    position: absolute;
    right: 0;
    top: -2px;
    color: red;
    font-size: 8px;
  }
}
.hot-category {
  a+a {
    margin-left: 10px;
  }
  .el-link {
    padding: 0 5px;
    border-radius: 10px;
    &.active, &.active:hover {
      color: var(--player-theme);
    }
  }
}
.el-pagination {
  margin: 40px;
}
</style>
