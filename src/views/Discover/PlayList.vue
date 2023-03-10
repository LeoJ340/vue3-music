<template>
  <div v-if="highQualityPlayList" class="top-playlist flex" @click="toHighQualityPlayList">
    <div class="top-playlist-bg" :style="{ backgroundImage: `url(${highQualityPlayList.coverImgUrl})` }"></div>
    <el-image :src="highQualityPlayList.coverImgUrl" />
    <div class="cover-info">
      <el-button round><CrownThree theme="outline" />精选歌单</el-button>
      <p>{{highQualityPlayList.name}}</p>
      <span class="text-12">{{highQualityPlayList.copywriter}}</span>
    </div>
  </div>
  <div class="flex justify-between items-end" style="margin: 15px 0;">
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
  <PlayLists v-loading="loading" element-loading-text="载入中..." :playlists="playlistPage.list" />
  <el-pagination
      small
      background
      layout="prev, pager, next"
      :page-size="playlistPage.size"
      v-model:current-page="playlistPage.page"
      :total="playlistPage.total"
      :hide-on-single-page="playlistPage.total < playlistPage.size"
      @current-change="changePage"
  />
</template>

<script setup lang="ts">
import PlayLists from '@/components/PlayLists/index.vue'
import {CrownThree, Right ,Earth, Piano, Cup, SlightlySmilingFace, GridTwo} from "@icon-park/vue-next";
import {reactive, ref, ShallowRef, shallowRef, watch} from "vue";
import {
  getHighQualityCategories,
  getHotCategories,
  getSubCategories,
  getTopPlaylistsByCategory,
  getTopPlayListsByHighQualityCategories
} from "@/api/playlist";
import {Category, HighQualityTag, HotCategory} from "@/models/Category";
import {PlayList} from "@/models/PlayList";
import type {Icon} from "@icon-park/vue-next/lib/runtime";
import {useRouter} from "vue-router";
import {useAppStore} from "@/stores/app";
import {storeToRefs} from "pinia";

const { currentTheme } = storeToRefs(useAppStore())
const router = useRouter()

// 精选歌单
const highQualityPlayList = ref<PlayList>()
const currentCategoryName = ref('全部歌单')

const allCategory = reactive<{ name: string; icon: ShallowRef<Icon>; sub: Category[]; row: number }[]>([
  {
    name: '语种',
    icon: shallowRef(Earth),
    sub: [],
    row: 3
  },
  {
    name: '风格',
    icon: shallowRef(Piano),
    sub: [],
    row: 6
  },
  {
    name: '场景',
    icon: shallowRef(Cup),
    sub: [],
    row: 4
  },
  {
    name: '情感',
    icon: shallowRef(SlightlySmilingFace),
    sub: [],
    row: 4
  },
  {
    name: '主题',
    icon: shallowRef(GridTwo),
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

const hotCategories = ref<HotCategory[]>([])
const highQualityCategories = ref<HighQualityTag[]>([])

async function init() {
  loading.value = true
  const initRes = await Promise.allSettled([await getHotCategories(), await getHighQualityCategories()])
  hotCategories.value = initRes[0].value
  highQualityCategories.value = initRes[1].value
  currentCategoryName.value = hotCategories.value[0].name
  const { playlists, total } = await getTopPlaylistsByCategory(currentCategoryName.value, playlistPage.size, playlistPage.page)
  loading.value = false
  playlistPage.list = playlists
  playlistPage.total = total
  // 异步获取全部分类
  getSubCategories().then(res => {
    allCategory.forEach((item, index) => {
      item.sub = res.filter(sub => sub.category === index)
    })
  })
}

init()

watch(currentCategoryName, val => {
  // 监听当前分类是否属于精选分类
  if (highQualityCategories.value.map(item => item.name).includes(val)) {
    // 获取精选歌单第一项
    getTopPlayListsByHighQualityCategories(val, 1).then(res => {
      highQualityPlayList.value = res.playlists[0]
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
  loading.value = true
  playlistPage.page = 1
  currentCategoryName.value = category
  getTopPlaylistsByCategory(currentCategoryName.value, playlistPage.size, playlistPage.page).then(res => {
    const { playlists, total } = res
    playlistPage.total = total
    playlistPage.list = playlists
  }).finally(() => {
    loading.value = false
  })
}

function changePage(page: number) {
  loading.value = true
  playlistPage.page = page
  getTopPlaylistsByCategory(currentCategoryName.value, playlistPage.size, playlistPage.page).then(res => {
    const { playlists, total } = res
    playlistPage.total = total
    playlistPage.list = playlists
  }).finally(() => {
    loading.value = false
  })
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
  display: flex;
  justify-content: center;
  margin-top: 20px;
  --el-color-primary: var(--player-theme);
}
</style>
