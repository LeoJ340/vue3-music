<template>
  <el-scrollbar>
    <!-- 歌单信息 -->
    <div v-if="playlistInfo" class="flex" style="margin: 20px;">
      <el-image :src="playlistInfo.coverImgUrl" class="coverImage" />
      <div class="flex-1" style="margin-left: 20px;">
        <div class="flex-vertical-center">
          <h2>{{playlistInfo.name}}</h2>
        </div>
        <div class="flex-vertical-center">
          <el-avatar :src="playlistInfo.creator.avatarUrl" />
          <!-- TODO：用户页 -->
          <span style="margin-left: 10px; font-size: 12px;">{{playlistInfo.creator.nickname}}</span>
          <span v-if="playlistInfo.updateTime"
                style="margin-left: 10px; font-size: 12px; color: #a4a4a4;">
            最近更新{{useFormatTime(playlistInfo.updateTime)}}
          </span>
          <span v-else
                style="margin-left: 10px; font-size: 12px; color: #a4a4a4;">
            {{useFormatTime(playlistInfo.createTime)}}创建
          </span>
        </div>
        <!-- 操作按钮组 -->
        <div class="flex" style="margin: 15px 0;">
          <el-button-group>
            <el-button type="primary" round :disabled="!songs.length" @click="playAll"><PlayOne theme="filled" size="22" />播放全部</el-button>
            <el-button type="primary" round :disabled="!songs.length" @click="playAll(false)"><Plus theme="filled" size="20" :strokeWidth="3" /></el-button>
          </el-button-group>
          <el-button round :disabled="!songs.length || !isCollected">
            <FolderPlus theme="outline" size="20" :strokeWidth="2"/>收藏
          </el-button>
          <!-- TODO：分享功能 -->
          <el-button round :disabled="!songs.length">
            <Share theme="outline" size="20" :strokeWidth="2"/>分享
          </el-button>
          <!-- TODO：下载功能 -->
          <el-button round :disabled="!songs.length">
            <Download theme="outline" size="20" :strokeWidth="2"/>下载全部
          </el-button>
        </div>
        <div v-if="playlistInfo.tags && playlistInfo.tags.length" class="text-14">
          <span>标签：{{playlistInfo.tags.join('/')}}</span>
        </div>
        <div class="text-14" style="margin-top: 2px;">
          <span>歌曲：{{playlistInfo.trackCount}}</span>
          <span style="margin-left: 10px;">播放：{{useFormatCount(playlistInfo.playCount)}}</span>
        </div>
        <div v-if="playlistInfo.description" class="flex justify-between text-14" style="margin-top: 2px;">
          <div>
            <span>简介：{{playlistInfo.description.split('\n')[0]}}</span>
            <p v-show="collapse" v-html="playlistInfo.description.split('\n').slice(1, playlistInfo.description.split('\n').length).join('<br>')"></p>
          </div>
          <Component
              v-if="playlistInfo.description.split('\n').length > 1"
              :is="collapse ? UpOne : DownOne"
              theme="filled" size="20" :strokeWidth="3"
              @click="collapse = !collapse"
          />
        </div>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <Songs :songs="songs" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import Songs from '@/components/Songs/index.vue'
import { PlayOne, Plus, FolderPlus, Share, Download, DownOne, UpOne } from '@icon-park/vue-next';
import { useFormatTime } from "@/utils/time";
import useFormatCount from "@/utils/count";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {computed, ref} from "vue";
import {getPlayList} from "@/api/playlist";
import {Song} from "@/models/Song";
import {PlayList} from "@/models/PlayList";
import {usePlayerStore} from "@/stores/player";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";

const currentRoute = useRoute()
const currentPlaylistId = ref(currentRoute.params.id)

const playlistInfo = ref<PlayList>()
const songs = ref<Song[]>([])

const { myPlayList } = storeToRefs(useUserStore())
const isCollected = computed(() => {
  return myPlayList.value.collected.map(item => item.id).includes(Number(currentPlaylistId.value))
})

// 简介下拉完全展示
const collapse = ref(false)

function getData() {
  if (currentPlaylistId.value !== 'undefined') {
    getPlayList(Number(currentPlaylistId.value)).then(res => {
      playlistInfo.value = res
      songs.value = res.tracks
      document.title = playlistInfo.value?.name
    })
  }
}

getData()

const { push } = usePlayerStore()
function playAll(replace: boolean = true) {
  push(songs.value.filter(item => !item.noCopyrightRcmd), { replace, trigger: 'playAll' })
}

onBeforeRouteUpdate(async to => {
  currentPlaylistId.value = to.params.id
  getData()
})
</script>

<style scoped>
.coverImage {
  width: 320px;
  height: 320px;
}
</style>
