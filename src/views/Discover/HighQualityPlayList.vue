<template>
  <main>
    <header class="flex justify-between items-center">
      <h3>精品歌单<el-link href="https://music.163.com/#/topic?id=202001" target="_blank" :underline="false"><help theme="outline" size="18" :strokeWidth="3"/></el-link></h3>
      <!-- TODO：缺一个图标 -->
      <el-button round>{{cat}}</el-button>
    </header>
    <div class="play-list">
      <div v-for="item in playLists" class="play-list-item">
        <div class="image">
          <el-image :src="item.coverImgUrl" />
          <div class="play-count">
            <PlayOne theme="outline" size="22" :strokeWidth="2"/>
            <span>{{useFormatCount(item.playCount)}}</span>
          </div>
          <PlayOne class="to-play" theme="filled" size="32" :strokeWidth="2"/>
        </div>
        <div class="info">
          <span class="info-name">{{item.name}}</span>
          <p class="text-12">by {{item.creator.nickname}}</p>
          <p class="text-12">{{item.copywriter}}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {getTopPlayListsByHighQualityCategories} from "@/api/playlist";
import {reactive, ref} from "vue";
import {PlayList} from "@/models/PlayList";
import {Help, PlayOne} from "@icon-park/vue-next";
import useFormatCount from "@/utils/count";

const currentRoute = useRoute()
const cat = ref(currentRoute.query.cat || '全部')
const limit = 50

const playLists = reactive<PlayList[]>([])

getTopPlayListsByHighQualityCategories(cat.value as string, limit).then(res => {
  playLists.push(...res.playlists)
})
</script>

<style scoped lang="scss">
main {
  margin: 20px;
}
.play-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
  .play-list-item {
    display: flex;
    .image {
      position: relative;
      .el-image {
        width: 180px;
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
        top: 140px;
        left: 140px;
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
    .info {
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
    }
  }
}
</style>
