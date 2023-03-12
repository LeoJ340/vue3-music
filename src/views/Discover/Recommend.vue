<template>
  <!-- banner -->
  <el-carousel :interval="4000" type="card" height="220px" @change="changeBanner">
    <el-carousel-item v-for="(banner, index) in bannerList" :key="index" @click="clickBanner(banner)">
      <div class="banner-item">
        <el-image :src="banner.imageUrl" />
        <div class="title" :style="{ backgroundColor: banner.titleColor }">{{banner.typeTitle}}</div>
      </div>
    </el-carousel-item>
  </el-carousel>
  <!-- 推荐歌单 -->
  <div class="playlists">
    <router-link to="/discover/playlist">
      <h3 class="flex-vertical-center m-0">推荐歌单<Right theme="outline" size="22"/></h3>
    </router-link>
    <ul class="playlists-content">
      <li v-if="hasLogin" class="playlist-item" @click="toDailySongs">
        <el-image :src="dailySongsBg" class="daily-songs-bg" />
        <Calendar theme="outline" fill="#ffffff"/>
        <div style="margin-top: 5px;">每日歌曲推荐</div>
        <PlayOne class="to-play" theme="filled" size="32" :strokeWidth="2"/>
      </li>
      <li v-for="item in playlists" class="playlist-item" @click="toPlayList(item.id)">
        <el-image :src="item.picUrl" />
        <div style="margin-top: 5px;">{{item.name}}</div>
        <div class="play-count">
          <PlayOne theme="outline" size="22" :strokeWidth="2"/>
          <span>{{useFormatCount(item.playCount || item.playcount)}}</span>
        </div>
        <PlayOne class="to-play" theme="filled" size="32" :strokeWidth="2"/>
      </li>
    </ul>
  </div>
  <!-- 最新音乐 -->
  <div class="top-songs">
    <router-link to="/discover/new/songs">
      <h3 class="flex-vertical-center m-0">最新音乐<Right theme="outline" size="22"/></h3>
    </router-link>
    <CoverHorizontal
        :list="topSongsFilter" :columns="3" imageSize="100px" :showPlayCount="false" playPlacement="center"
        class="top-songs"
        v-slot="{ item }" @click="clickTopSong">
      <span>{{item.name}}</span>
      <span class="text-12">{{item.artists}}</span>
    </CoverHorizontal>
  </div>
</template>

<script setup lang="ts">
import dailySongsBg from '@/assets/dailySongsBg.jpg'
import CoverHorizontal from '@/components/CoverHorizontal/index.vue'
import {Right, PlayOne, Calendar} from "@icon-park/vue-next";
import {computed, reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {banners, personalized, recommendPlaylists} from "@/api/recommend";
import {Banner} from "@/models/Banner";
import {useUserStore} from "@/stores/user";
import {Personalized} from "@/models/personalized";
import useFormatCount from "@/utils/count";
import {getSong, getTopSongs} from "@/api/song";
import {usePlayerStore} from "@/stores/player";
import {TopSong} from "@/models/Song";
import {useToSong} from "@/utils/typeFormate";

const router = useRouter()
const { playImmediately } = usePlayerStore()
/**
 * banner
 */
const bannerList = ref<Banner[]>([])
banners().then(res => {
  bannerList.value = res
})

const currentBannerIndex = ref(0)
function changeBanner(index: number) {
  currentBannerIndex.value = index
}

function clickBanner(banner: Banner) {
  const index = bannerList.value.findIndex(item => item.imageUrl === banner.imageUrl)
  if (currentBannerIndex.value !== index) return
  if (banner.targetType === 1) {
    getSong([banner.targetId]).then(song => {
      playImmediately(song)
    })
  } else if(banner.targetType === 10) {
    router.push(`/playlist/${banner.targetId}`)
  } else {
    window.open(banner.url, '_blank')
  }
}

/**
 * 推荐歌单
 */
const playlists = ref<Personalized[]>([])
const { hasLogin } = storeToRefs(useUserStore())
watch(hasLogin, value => {
  if (value) {
    recommendPlaylists().then(res => {
      playlists.value = res.slice(0, 9)
    })
  } else {
    personalized(10).then(res => {
      playlists.value = res
    })
  }
}, { immediate: true })

// 去歌单页
function toPlayList(id: number) {
  router.push(`/playlist/${id}`)
}

function toDailySongs() {
  router.push('/dailySongs')
}

/**
 * 最新音乐
 */
const topSongs = reactive<TopSong[]>([])
// 过滤给组件的数据
const topSongsFilter = computed(() => {
  return topSongs.map(item => {
    return {
      id: item.id,
      coverImgUrl: item.album.picUrl,
      name: item.name,
      artists: item.artists.map(artist => artist.name).join('/')
    }
  })
})

function clickTopSong(id: number) {
  const index = topSongs.findIndex(item => item.id === id)
  playImmediately(useToSong(topSongs[index]))
}

getTopSongs(0).then(res => {
  topSongs.push(...res.slice(0, 12))
})
</script>

<style scoped lang="scss">
.el-carousel__item{
  z-index: 1;
}
.el-carousel__item.is-active{
  z-index: 2;
}
.banner-item {
  position: relative;
  .el-image {
    border-radius: 10px;
  }
  .title {
    position: absolute;
    right: 0;
    bottom: 4px;
    padding: 3px 7px;
    border-radius: 10px 0;
    color: #ffffff;
  }
}
.playlists-content {
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
  .playlist-item {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    .daily-songs-bg {
      width: 100%;
      filter: blur(4px);
    }
    .i-icon-calendar {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 120px;
    }
    .play-count {
      position: absolute;
      top: 0;
      right: 5px;
      display: flex;
      align-items: center;
      color: #ffffff;
    }
    .to-play {
      position: absolute;
      top: 180px;
      right: 10px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.8);
      color: var(--player-theme);
      visibility: hidden;
      opacity: 0;
      transition: all 1s;
    }
    &:hover {
      .to-play {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>
