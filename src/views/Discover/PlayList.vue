<template>
  <div v-if="highQualityPlayList" class="top-playlist flex">
    <div class="top-playlist-bg" :style="{ backgroundImage: `url(${highQualityPlayList.coverImgUrl})` }"></div>
    <el-image :src="highQualityPlayList.coverImgUrl" />
    <div class="cover-info">
      <el-button round><CrownThree theme="outline" />精选歌单</el-button>
      <p>{{highQualityPlayList.name}}</p>
      <span class="text-12">{{highQualityPlayList.copywriter}}</span>
    </div>
  </div>
  <div class="flex justify-between items-end" style="margin: 15px 0;">
    <el-popover placement="bottom-start" width="auto" trigger="click">
      <template #reference>
        <el-button round>{{currentCategoryName}}<Right theme="outline"/></el-button>
      </template>
      <!-- TODO：这个popover需要优化 -->
      <div style="margin: 10px;">全部歌单</div>
      <el-divider />
      <div v-for="item in allCategory" class="sub-category">
        <span><Component :is="item.icon" theme="outline" size="24" :strokeWidth="2"/>{{item.name}}</span>
        <el-link v-for="subCategory in item.sub" :underline="false" @click="changeCategory(subCategory.name)">
          {{subCategory.name}}
          <span v-if="subCategory.hot" class="badge">hot</span>
        </el-link>
      </div>
    </el-popover>
    <div class="hot-category">
      <el-link v-for="category in hotCategories" :underline="false" @click="changeCategory(category.name)">{{category.name}}</el-link>
    </div>
  </div>
  <PlayLists :playlists="playlistPage.list" />
  <el-pagination
      small
      background
      layout="prev, pager, next"
      :page-size="playlistPage.size"
      v-model:current-page="playlistPage.index"
      :total="playlistPage.total"
      :hide-on-single-page="playlistPage.total < playlistPage.size"
      @current-change="changePage"
  />
</template>

<script setup lang="ts">
import PlayLists from '@/components/PlayLists/index.vue'
import {CrownThree, Right ,Earth, SlightlySmilingFace} from "@icon-park/vue-next";
import {reactive, ref, watch} from "vue";
import {
  getHighQualityCategories,
  getHotCategories,
  getSubCategories,
  getTopPlaylistsByCategory,
  getTopPlayListsByHighQualityCategories
} from "@/api/playlist";
import {Category, HighQualityTag, HotCategory} from "@/models/Category";
import {PlayList} from "@/models/PlayList";
import {Icon} from "@icon-park/vue-next/lib/runtime";

const highQualityPlayList = ref<PlayList>()
const currentCategoryName = ref('全部歌单')

const allCategory = reactive<{ name: string; icon: Icon; sub: Category[]; }[]>([
  {
    name: '语种',
    icon: Earth,
    sub: []
  },
  {
    name: '风格',
    icon: SlightlySmilingFace,
    sub: []
  },
  {
    name: '场景',
    icon: SlightlySmilingFace,
    sub: []
  },
  {
    name: '情感',
    icon: SlightlySmilingFace,
    sub: []
  },
  {
    name: '主题',
    icon: SlightlySmilingFace,
    sub: []
  }
])

const playlistPage = reactive<{ list: PlayList[]; page: number; size: number; total: number }>({
  list: [],
  page: 1,
  size: 10,
  total: 0
})

const hotCategories = ref<HotCategory[]>([])
const highQualityCategories = ref<HighQualityTag[]>([])

async function init() {
  const initRes = await Promise.allSettled([await getHotCategories(), await getHighQualityCategories()])
  hotCategories.value = initRes[0].value
  highQualityCategories.value = initRes[1].value
  currentCategoryName.value = hotCategories.value[0].name
  const { playlists, total } = await getTopPlaylistsByCategory(currentCategoryName.value, playlistPage.size, playlistPage.page)
  playlistPage.list = playlists
  playlistPage.total = total
  getSubCategories().then(res => {
    allCategory.forEach((item, index) => {
      item.sub = res.filter(sub => sub.category === index)
    })
  })
}

init()

watch(currentCategoryName, val => {
  if (highQualityCategories.value.map(item => item.name).includes(val)) {
    getTopPlayListsByHighQualityCategories(val, 1).then(res => {
      highQualityPlayList.value = res.playlists[0]
    })
  }
})

function changeCategory(category: string) {
  playlistPage.page = 1
  currentCategoryName.value = category
  getTopPlaylistsByCategory(currentCategoryName.value, playlistPage.size, playlistPage.page).then(res => {
    const { playlists, total } = res
    playlistPage.total = total
    playlistPage.list = playlists
  })
}

function changePage() {
  getTopPlaylistsByCategory(currentCategoryName.value, playlistPage.size, playlistPage.page).then(res => {
    const { playlists, total } = res
    playlistPage.total = total
    playlistPage.list = playlists
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
    }
  }
}
.sub-category {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  span {
    grid-row-start: 1;
    grid-row-end: 6;
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
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  --el-color-primary: var(--player-theme);
}
</style>
