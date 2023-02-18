<template>
  <el-carousel :interval="4000" type="card" height="220px">
    <el-carousel-item v-for="(banner, index) in bannerList" :key="index" @click="clickBanner(banner)">
      <div class="banner-item">
        <el-image :src="banner.imageUrl" />
        <div class="title" :style="{ backgroundColor: banner.titleColor }">{{banner.typeTitle}}</div>
      </div>
    </el-carousel-item>
  </el-carousel>
  <!-- 推荐歌单 -->
  <div class="playlists">
    <h3 class="flex-vertical-center m-0">推荐歌单<Right theme="outline" size="22"/></h3>
    <ul class="playlists-content">
      <li v-if="hasLogin" class="playlist-item daily-songs" @click="toDailySongs">
        <el-image :src="dailySongsBg" />
        <Calendar theme="outline" fill="#ffffff"/>
        <div style="margin-top: 5px;">每日歌曲推荐</div>
        <PlayOne class="to-play" theme="filled" size="32" :strokeWidth="2"/>
      </li>
      <li v-for="item in playlists" class="playlist-item" @click="toPlayList(item.id)">
        <el-image :src="item.picUrl" />
        <div style="margin-top: 5px;">{{item.name}}</div>
        <div class="play-count">
          <PlayOne theme="outline" size="22" :strokeWidth="2"/>
          <span>{{useFormatCount(item.playCount)}}</span>
        </div>
        <PlayOne class="to-play" theme="filled" size="32" :strokeWidth="2"/>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {banners, personalized, recommendPlaylists} from "@/api/recommend";
import {Banner} from "@/models/Banner";
import {useUserStore} from "@/stores/user";
import {Right, PlayOne, Calendar} from "@icon-park/vue-next";
import {Personalized} from "@/models/personalized";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import useFormatCount from "@/utils/count";
import {getSong} from "@/api/playlist";
import {usePlayerStore} from "@/stores/player";
import dailySongsBg from '@/assets/dailySongsBg.jpg'

// banner
const bannerList = ref<Banner[]>([])
banners().then(res => {
  bannerList.value = res
})

const { playImmediately } = usePlayerStore()
function clickBanner(banner: Banner) {
  if (banner.targetType === 1) {
    getSong([banner.targetId]).then(song => {
      playImmediately(song)
    })
  } else {
    window.open(banner.url, '_blank')
  }
}

// 推荐歌单
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
const router = useRouter()
function toPlayList(id: number) {
  router.push(`/playlist/${id}`)
}

function toDailySongs() {
  router.push('/dailySongs')
}
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
  .playlist-item {
    width: 19%;
    margin-right: 1%;
    margin-top: 20px;
    position: relative;
    cursor: pointer;
    .i-icon-calendar {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 120px;
    }
    &:nth-child(5n) {
      margin-right: 0;
    }
    .el-image {
      width: 100%;
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
      color: var(--playlist-playing);
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
