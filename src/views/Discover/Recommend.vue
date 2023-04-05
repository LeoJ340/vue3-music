<template>
  <!-- banner -->
  <el-carousel :interval="4000" type="card" height="220px" @change="changeBanner">
    <el-carousel-item v-for="(banner, index) in banners" :key="index" @click="clickBanner(banner)">
      <div class="banner-item">
        <el-image :src="banner.imageUrl" />
        <div class="title" :style="{ backgroundColor: banner.titleColor }">{{banner.typeTitle}}</div>
      </div>
    </el-carousel-item>
  </el-carousel>
  <!-- 推荐歌单 -->
  <router-link to="/discover/playlist" class="plate-title">
    <h3 class="flex-vertical-center m-0">推荐歌单<Right theme="outline" size="22"/></h3>
  </router-link>
  <div class="grid-col5">
    <Cover v-if="hasLogin" class="relative daily-songs"
           mode="vertical" :image-url="dailySongsBg"
           icon-placement="bottom-right" icon-transition="el-fade-in-linear" @click="toDailySongs">
      <Calendar theme="outline" fill="#ffffff"/>
      <div>每日歌曲推荐</div>
    </Cover>
    <Cover v-for="item in playlists"
           mode="vertical" :image-url="item.picUrl" :play-count="item.playCount"
           icon-placement="bottom-right" icon-transition="el-fade-in-linear" @click="toCommonPlayList(item.id)">
      <div>{{item.name}}</div>
    </Cover>
  </div>
  <!-- 独家放送 -->
  <router-link to="/">
    <h3 class="flex-vertical-center m-0">独家放送<Right theme="outline" size="22"/></h3>
  </router-link>
  <div class="grid-col3">
    <Cover v-for="item in privateMVList"
           mode="vertical" :image-url="item.picUrl"
           icon-placement="top-left" icon-transition="only-show" @click="toMv(item.id)">
      <div>{{item.name}}</div>
    </Cover>
  </div>
  <!-- 最新音乐 -->
  <router-link to="/discover/new/songs">
    <h3 class="flex-vertical-center m-0">最新音乐<Right theme="outline" size="22"/></h3>
  </router-link>
  <div class="grid-col3">
    <Cover v-for="item in topSongs"
           mode="horizontal" :image-url="item.album.picUrl" image-size="100px"
           icon-placement="center" icon-transition="only-show" @click="clickTopSong(item.id)">
      <p>{{item.name}}</p>
      <span class="text-12">{{item.artists.map(artist => artist.name).join('/')}}</span>
    </Cover>
  </div>
  <!-- 推荐MV -->
  <router-link to="/video/mv">
    <h3 class="flex-vertical-center m-0">推荐MV<Right theme="outline" size="22"/></h3>
  </router-link>
  <div class="grid-col3">
    <Cover v-for="item in personalizedMVList"
           mode="vertical" :image-url="item.picUrl" @click="toMv(item.id)">
      <div>{{item.name}}</div>
      <span class="text-12">{{item.artists.map(artist => artist.name).join('/')}}</span>
    </Cover>
  </div>
</template>

<script setup lang="ts">
import dailySongsBg from '@/assets/dailySongsBg.jpg'
import Cover from '@/components/Cover/index.vue'
import {Right, Calendar} from "@icon-park/vue-next";
import {reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
import {usePlayerStore} from "@/stores/player";
import {
  getBanners,
  getPersonalizedMV,
  getPersonalizedPlaylists,
  getPrivateMV,
  getRecommendPlaylists
} from "@/api/recommend";
import {getSong, getTopSongs} from "@/api/song";
import {Banner} from "@/models/Banner";
import {PersonalizedPlayList} from "@/models/PlayList";
import {TopSong} from "@/models/Song";
import {PersonalizedMV, PrivateMV} from "@/models/MV";
import {useToSong} from "@/utils/typeFormate";
import {toCommonPlayList} from "@/router/usePush";

const router = useRouter()
const { playImmediately } = usePlayerStore()
/**
 * banner
 */
const banners = ref<Banner[]>([])
getBanners().then(res => {
  banners.value = res
})

const currentBannerIndex = ref(0)
function changeBanner(index: number) {
  currentBannerIndex.value = index
}

function clickBanner(banner: Banner) {
  const index = banners.value.findIndex(item => item.imageUrl === banner.imageUrl)
  if (currentBannerIndex.value !== index) return
  if (banner.targetType === 1) {
    getSong([banner.targetId]).then(songs => {
      playImmediately(songs[0])
    })
  } else if(banner.targetType === 10) {
    toCommonPlayList(banner.targetId)
  } else {
    window.open(banner.url, '_blank')
  }
}

/**
 * 推荐歌单
 */
const playlists = ref<PersonalizedPlayList[]>([])
const { hasLogin } = storeToRefs(useUserStore())
watch(hasLogin, value => {
  if (value) {
    getRecommendPlaylists().then(res => {
      playlists.value = res.slice(0, 9)
    })
  } else {
    getPersonalizedPlaylists(10).then(res => {
      playlists.value = res
    })
  }
}, { immediate: true })

function toDailySongs() {
  router.push('/dailySongs')
}

/**
 * 最新音乐
 */
const topSongs = reactive<TopSong[]>([])

function clickTopSong(id: number) {
  const index = topSongs.findIndex(item => item.id === id)
  playImmediately(useToSong(topSongs[index]))
}

getTopSongs(0).then(res => {
  topSongs.push(...res.slice(0, 12))
})

/**
 * 推荐MV
 */
const personalizedMVList = ref<PersonalizedMV[]>([])
getPersonalizedMV().then(res => {
  personalizedMVList.value = res
})

function toMv(id: number) {
  router.push(`/mv/${id}`)
}

/**
 * 独家放送
 */
const privateMVList = ref<PrivateMV[]>()
getPrivateMV().then(res => {
  privateMVList.value = res
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
.daily-songs {
  .el-image {
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
}
</style>
