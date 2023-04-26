<template>
  <el-scrollbar>
    <!-- 歌单信息 -->
    <div class="flex" style="margin: 20px;">
      <el-image :src="myPlayList.liked.coverImgUrl" class="coverImage" />
      <div class="flex-1" style="margin-left: 20px;">
        <div class="flex-vertical-center">
          <h2 style="margin-left: 10px;">我喜欢的音乐</h2>
        </div>
        <div class="flex-vertical-center">
          <el-avatar :src="userInfo.avatarUrl" />
          <!-- TODO：用户页 -->
          <span style="margin-left: 10px; font-size: 12px;">
            <el-link v-if="hasLogin" :underline="false">{{userInfo.userName}}</el-link>
            <el-link v-else :underline="false" type="primary" @click="toLogin">未登录></el-link>
          </span>
          <span v-if="myPlayList.liked.updateTime"
                style="margin-left: 10px; font-size: 12px; color: #a4a4a4;">
            最近更新{{useFormatTime(myPlayList.liked.updateTime)}}
          </span>
          <span v-else
                style="margin-left: 10px; font-size: 12px; color: #a4a4a4;">
            {{useFormatTime(myPlayList.liked.createTime)}}创建
          </span>
        </div>
        <!-- 操作按钮组 -->
        <div class="flex" style="margin: 15px 0;">
          <el-button-group>
            <el-button type="primary" round :disabled="!songs.length" @click="playAll"><PlayOne theme="filled" size="22" />播放全部</el-button>
            <el-button type="primary" round :disabled="!songs.length" @click="playAll(false)"><Plus theme="filled" size="20" :strokeWidth="3" /></el-button>
          </el-button-group>
          <el-button round disabled><FolderPlus theme="outline" size="20" :strokeWidth="2"/>收藏</el-button>
          <!-- TODO：分享功能 -->
          <el-button round :disabled="!songs.length">
            <Share theme="outline" size="20" :strokeWidth="2"/>分享
          </el-button>
          <!-- TODO：下载功能 -->
          <el-button round :disabled="!songs.length">
            <Download theme="outline" size="20" :strokeWidth="2"/>下载全部
          </el-button>
        </div>
        <div class="text-14">
          <span>歌曲：{{myPlayList.liked.trackCount || 0}}</span>
          <span style="margin-left: 10px;">播放：{{useFormatCount(myPlayList.liked.playCount) || 0}}</span>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <Songs :songs="songs" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import Songs from "@/components/Songs/index.vue";
import { PlayOne, Plus, FolderPlus, Share, Download } from '@icon-park/vue-next';
import { useFormatTime } from "@/utils/time";
import useFormatCount from "@/utils/count";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
import {usePlayerStore} from "@/stores/player";
import {Song} from "@/models/Song";
import {getPlayListTrack} from "@/api/playlist";


const router = useRouter()
const currentRoute = useRoute()
const currentPlaylistId = ref(currentRoute.params.id)

const userStore = useUserStore()
const { hasLogin, myPlayList, userInfo } = storeToRefs(userStore)
const { toLogin } = userStore

const songs = ref<Song[]>([])

function getTracks() {
  if (currentPlaylistId.value === '-1') return
  getPlayListTrack(Number(currentPlaylistId.value)).then(res => {
    songs.value = res
  })
}

getTracks()

const { push } = usePlayerStore()
function playAll(replace: boolean = true) {
  push(songs.value.filter(item => !item.noCopyrightRcmd), { replace, trigger: 'playAll' })
}
</script>

<style scoped>
.coverImage {
  width: 320px;
  height: 320px;
}
</style>
