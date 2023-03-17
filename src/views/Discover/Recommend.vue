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
    <div class="grid-col5">
      <Cover v-if="hasLogin" class="relative daily-songs"
             mode="vertical" :image-url="dailySongsBg"
             icon-placement="bottom-right" icon-transition="" @click="toDailySongs">
        <Calendar theme="outline" fill="#ffffff"/>
        <div>每日歌曲推荐</div>
      </Cover>
      <Cover v-for="item in playlists"
             mode="vertical" :image-url="item.picUrl"
             icon-placement="bottom-right" icon-transition="" @click="toPlayList(item.id)">
        <div>{{item.name}}</div>
      </Cover>
    </div>
  </div>
  <!-- 最新音乐 -->
  <div class="top-songs">
    <router-link to="/discover/new/songs">
      <h3 class="flex-vertical-center m-0">最新音乐<Right theme="outline" size="22"/></h3>
    </router-link>
    <div class="grid-col3">
      <Cover v-for="item in topSongs"
             mode="horizontal" :image-url="item.album.picUrl" image-size="100px"
             icon-placement="center" icon-transition="" @click="clickTopSong(item.id)">
        <p>{{item.name}}</p>
        <span class="text-12">{{item.artists.map(artist => artist.name).join('/')}}</span>
      </Cover>
    </div>
  </div>
</template>

<script setup lang="ts">
import dailySongsBg from '@/assets/dailySongsBg.jpg'
import Cover from '@/components/Cover/index.vue'
import {Right, Calendar} from "@icon-park/vue-next";
import {reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {banners, personalized, recommendPlaylists} from "@/api/recommend";
import {Banner} from "@/models/Banner";
import {useUserStore} from "@/stores/user";
import {Personalized} from "@/models/personalized";
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
