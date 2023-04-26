<template>
  <el-scrollbar>
    <!-- 歌单信息 -->
    <div v-if="album" class="flex" style="margin: 20px;">
      <el-image :src="album.blurPicUrl" class="coverImage" />
      <div class="flex-1" style="margin-left: 20px;">
        <div class="flex-vertical-center">
          <h2>{{album.name}}</h2>
        </div>
        <!-- 操作按钮组 -->
        <div class="flex" style="margin: 15px 0;">
          <el-button-group>
            <el-button type="primary" round :disabled="!album?.songs.length" @click="playAll"><PlayOne theme="filled" size="22" />播放全部</el-button>
            <el-button type="primary" round :disabled="!album?.songs.length" @click="playAll(false)"><Plus theme="filled" size="20" :strokeWidth="3" /></el-button>
          </el-button-group>
          <!-- TODO：收藏功能 -->
          <el-button round disabled>
            <FolderPlus theme="outline" size="20" :strokeWidth="2"/>收藏
          </el-button>
          <!-- TODO：分享功能 -->
          <el-button round disabled>
            <Share theme="outline" size="20" :strokeWidth="2"/>分享
          </el-button>
          <!-- TODO：下载功能 -->
          <el-button round disabled>
            <Download theme="outline" size="20" :strokeWidth="2"/>下载全部
          </el-button>
        </div>
        <div class="flex-vertical-center flex-wrap text-14">
          歌手：<ArtistColumn :artists="album.artists" />
        </div>
        <div class="flex-vertical-center text-14" style="margin-top: 2px;">
          时间：{{useFormatTime(album.publishTime)}}
        </div>
      </div>
    </div>
    <!-- Tab切换 -->
    <el-menu :default-active="curTab" mode="horizontal" @select="changeTab">
      <el-menu-item v-for="tab in tabs" :index="tab">{{tab}}</el-menu-item>
    </el-menu>
    <div v-if="album">
      <Songs v-show="curTab === '歌曲列表'" :songs="album.songs" />
      <Desc v-show="curTab === '专辑详情'" :description="album.description" />
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import ArtistColumn from "@/components/Songs/ArtistColumn.vue";
import { PlayOne, Plus, FolderPlus, Share, Download } from '@icon-park/vue-next';
import Desc from './Desc.vue'
import Songs from '@/components/Songs/index.vue'
import {reactive, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {usePlayerStore} from "@/stores/player";
import {getAlbum} from "@/api/album";
import {Album} from "@/models/Album";
import { useFormatTime } from "@/utils/time";

/**
 * 获取数据
 */
const currentRoute = useRoute()
const currentAlbumId = ref(currentRoute.params.id)
const album = ref<Album>()
function getData() {
  if (currentAlbumId.value !== 'undefined') {
    getAlbum(Number(currentAlbumId.value)).then(res => {
      album.value = res
      document.title = album.value?.name
    })
  }
}
getData()
onBeforeRouteUpdate(async to => {
  currentAlbumId.value = to.params.id
  getData()
})

/**
 * 播放
 */
const { push } = usePlayerStore()
function playAll(replace: boolean = true) {
  if (!album.value) return
  push(album.value!.songs.filter(item => !item.noCopyrightRcmd), { replace, trigger: 'playAll' })
}

/**
 * tab切换
 */
const tabs = reactive(['歌曲列表', '专辑详情'])
const curTab = ref(tabs[0])
function changeTab(index: string) {
  curTab.value = index
}
</script>

<style scoped>
.coverImage {
  width: 320px;
  height: 320px;
}
</style>
