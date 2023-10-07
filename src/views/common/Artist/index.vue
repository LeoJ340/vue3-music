<template>
  <el-scrollbar v-if="artistDetail">
    <!-- 歌手封面、信息 -->
    <div class="artist-info flex">
      <el-image :src="artistDetail.cover" class="artist-cover" lazy />
      <div>
        <h3 class="mt-0">{{artistDetail.name}}</h3>
        <p class="text-14">{{artistDetail.alias.join('；')}}</p>
        <el-button round><FolderPlus theme="outline" size="20" :strokeWidth="2"/>收藏</el-button>
        <!-- TODO：用户页 -->
        <el-button round><User theme="outline" size="20" :strokeWidth="2"/>个人主页</el-button>
        <p class="text-14">
          <span>单曲数：{{artistDetail.musicSize}}</span>
          &nbsp;&nbsp;
          <span>专辑数：{{artistDetail.albumSize}}</span>
          &nbsp;&nbsp;
          <span>MV数：{{artistDetail.mvSize}}</span>
        </p>
      </div>
    </div>
    <!-- tab+专辑布局切换 -->
    <div class="relative">
      <el-menu mode="horizontal" :default-active="menuList[0].key" @select="changeComponent">
        <el-menu-item v-for="menuItem in menuList" :key="menuItem.key" :index="menuItem.key">{{menuItem.text}}</el-menu-item>
      </el-menu>
    </div>
    <KeepAlive>
      <Component :is="activeMenu.component" />
    </KeepAlive>
  </el-scrollbar>
  <!-- 无网络显示 -->
  <NetLess v-if="noNetwork" />
</template>

<script setup lang="ts">
import NetLess from '@/components/NetLess/index.vue'
import { FolderPlus, User } from '@icon-park/vue-next';
import {reactive, ref, markRaw} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {getArtistDetail} from "@/api/artist";
import {ArtistDetail} from "@/models/Artist";
import Album from './Album.vue'
import MV from './MV.vue'
import Desc from './Desc.vue'
import Simi from './Simi.vue'

const currentRoute = useRoute()
const artistId = ref(currentRoute.params.id)

const artistDetail = ref<ArtistDetail>()
const noNetwork = ref(false)

/**
 * 获取歌手详情
 */
function getData() {
  getArtistDetail(Number(artistId.value)).then(res => {
    artistDetail.value = res
    noNetwork.value = false
  }).catch((reason: string) => {
    if (reason === '网络异常') {
      noNetwork.value = true
    }
  })
}

getData()

onBeforeRouteUpdate(to => {
  artistId.value = to.params.id
  getData()
})

/**
 * 动态组件切换
 */
const menuList = reactive([
  {
    key: 'album',
    text: '专辑',
    component: markRaw(Album)
  },
  {
    key: 'mv',
    text: 'MV',
    component: markRaw(MV)
  },
  {
    key: 'desc',
    text: '歌手详情',
    component: markRaw(Desc)
  },
  {
    key: 'simi',
    text: '相似歌手',
    component: markRaw(Simi)
  }
])

const activeMenu = ref(menuList[0])

function changeComponent(key: string) {
  activeMenu.value = menuList.find(item => item.key === key)!
}
</script>

<style scoped lang="scss">
.artist-info {
  margin: 20px;
}
.artist-cover {
  width: 200px;
  border-radius: 10px;
  margin-right: 20px;
}
</style>
