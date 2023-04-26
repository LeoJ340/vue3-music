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
  <div class="flex-vertical-center">
    <router-link to="/discover/playlist">
      <h3>推荐歌单<Right theme="outline" size="22"/></h3>
    </router-link>
  </div>
  <div class="grid-col5">
    <Cover v-if="hasLogin" class="relative daily-songs"
           mode="vertical" :image-url="dailySongsBg"
           icon-placement="bottom-right" icon-transition="el-fade-in-linear" @click="toDailySongs">
      <Calendar theme="outline" fill="#ffffff" @click="toDailySongs"/>
      <el-link :underline="false" @click="toDailySongs">每日歌曲推荐</el-link>
    </Cover>
    <Cover v-for="item in playlists"
           mode="vertical" :image-url="item.picUrl" :play-count="item.playCount"
           icon-placement="bottom-right" icon-transition="el-fade-in-linear" @click="toCommonPlayList(item.id)">
      <el-link :underline="false" @click="toCommonPlayList(item.id)">{{item.name}}</el-link>
    </Cover>
  </div>
  <!-- 独家放送 -->
  <div class="flex-vertical-center">
    <router-link to="/privateMVList">
      <h3>独家放送<Right theme="outline" size="22"/></h3>
    </router-link>
  </div>
  <div class="grid-col3">
    <Cover v-for="item in privateMVList"
           mode="vertical" :image-url="item.picUrl"
           icon-placement="top-left" icon-transition="only-show" @click="toMv(item.id)">
      <el-link :underline="false" @click="toMv(item.id)">{{item.name}}</el-link>
    </Cover>
  </div>
  <!-- 最新音乐 -->
  <div class="flex-vertical-center">
    <router-link to="/discover/new/songs">
      <h3>最新音乐<Right theme="outline" size="22"/></h3>
    </router-link>
  </div>
  <div class="grid-col3">
    <Cover v-for="item in topSongs"
           mode="horizontal" :image-url="item.album.picUrl" image-size="100px"
           icon-placement="center" icon-transition="only-show" @click="clickTopSong(item.id)">
      <p>{{item.name}}</p>
      <span class="text-12">
        <ArtistColumn :artists="item.artists" />
      </span>
    </Cover>
  </div>
  <!-- 推荐MV -->
  <div class="flex-vertical-center">
    <router-link to="/video/mv">
      <h3>推荐MV<Right theme="outline" size="22"/></h3>
    </router-link>
  </div>
  <div class="grid-col3">
    <Cover v-for="item in personalizedMVList"
           mode="vertical" :image-url="item.picUrl" @click="toMv(item.id)">
      <el-link :underline="false" @click="toMv(item.id)">{{item.name}}</el-link>
      <div>
        <ArtistColumn :artists="item.artists" />
      </div>
    </Cover>
  </div>
</template>

<script setup lang="ts">
import dailySongsBg from '@/assets/dailySongsBg.jpg'
import Cover from '@/components/Cover/index.vue'
import {Right, Calendar} from "@icon-park/vue-next";
import ArtistColumn from '@/components/Songs/ArtistColumn.vue'
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
import {toCommonAlbum, toCommonPlayList} from "@/router/usePush";

const router = useRouter()
const { playImmediately } = usePlayerStore()
/**
 * banner
 */
const banners = ref<Banner[]>([])
getBanners().then(res => {
  banners.value = res
}).catch((reason: string) => {
  if (reason === '网络异常') {
    ElMessage({
      message: '系统异常',
      type: 'error',
      duration: 1000,
      center: true
    })
  }
})

const currentBannerIndex = ref(0)
function changeBanner(index: number) {
  currentBannerIndex.value = index
}

function clickBanner(banner: Banner) {
  const index = banners.value.findIndex(item => item.imageUrl === banner.imageUrl)
  if (currentBannerIndex.value !== index) return
  // 新歌首发
  if (banner.targetType === 1) {
    getSong([banner.targetId]).then(songs => {
      playImmediately(songs[0])
    })
    return
  }
  // 专辑
  if (banner.targetType === 10) {
    toCommonAlbum(banner.targetId)
  }
  // 歌单
  if (banner.targetType === 1000) {
    toCommonPlayList(banner.targetId)
  }
  if (banner.url) {
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
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
