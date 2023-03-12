<template>
  <main>
    <header class="flex justify-between items-center">
      <h3>精品歌单<el-link href="https://music.163.com/#/topic?id=202001" target="_blank" :underline="false"><help theme="outline" size="18" :strokeWidth="3"/></el-link></h3>
      <el-popover placement="bottom-start" width="600" trigger="click" :effect="currentTheme === 'dark' ? 'dark' : 'light'">
        <template #reference>
          <el-button round><Filter theme="outline" size="16" :strokeWidth="3"/>{{cat}}</el-button>
        </template>
        <div class="all-cate" @click="changeCat('全部')">全部歌单</div>
        <el-divider />
        <div class="cate-list">
          <div v-for="item in highQualityCategories"
               class="cate-item" :class="{ 'active': item.name === cat }"
               @click="changeCat(item.name)">{{item.name}}</div>
        </div>
      </el-popover>
    </header>
    <!-- TODO：下拉滚动 -->
    <div class="play-list">
      <div v-for="item in playLists" class="play-list-item">
        <div class="image" @click="toPlayList(item.id)">
          <el-image :src="item.coverImgUrl" />
          <div class="play-count">
            <PlayOne theme="outline" size="22" :strokeWidth="2"/>
            <span>{{useFormatCount(item.playCount)}}</span>
          </div>
          <PlayOne class="to-play" theme="filled" size="32" :strokeWidth="2"/>
        </div>
        <div class="info">
          <span class="info-name">{{item.name}}</span>
          <p class="text-12 flex">
            by {{item.creator.nickname}}
            <el-image v-if="item.creator.avatarDetail" :src="item.creator.avatarDetail?.identityIconUrl" style="margin-left: 2px; width: 15px;" />
          </p>
          <p class="text-12">{{item.copywriter}}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {getHighQualityCategories, getTopPlayListsByHighQualityCategories} from "@/api/playlist";
import {reactive, ref} from "vue";
import {PlayList} from "@/models/PlayList";
import {Help, Filter, PlayOne} from "@icon-park/vue-next";
import useFormatCount from "@/utils/count";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/stores/app";
import {HighQualityTag} from "@/models/Category";

const { currentTheme } = storeToRefs(useAppStore())

const highQualityCategories = ref<HighQualityTag[]>([])
getHighQualityCategories().then(res => {
  highQualityCategories.value = res
})

const currentRoute = useRoute()
const cat = ref(currentRoute.query.cat || '全部')
const limit = 50

const playLists = reactive<PlayList[]>([])

getTopPlayListsByHighQualityCategories(cat.value as string, limit).then(res => {
  playLists.push(...res.playlists)
})

function changeCat(category: string) {
  if (category === cat.value) return
  playLists.length = 0
  cat.value = category
  getTopPlayListsByHighQualityCategories(cat.value as string, limit).then(res => {
    playLists.push(...res.playlists)
  })
}

const router = useRouter()
function toPlayList(id: number) {
  router.push(`/playlist/${id}`)
}
</script>

<style scoped lang="scss">
main {
  margin: 20px;
}
.all-cate {
  margin: 10px;
  cursor: pointer;
  &:hover {
    color: var(--player-theme-light);
  }
}
.cate-list {
  display: flex;
  flex-wrap: wrap;
  .cate-item {
    width: 80px;
    margin: 10px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: var(--player-theme-light);
    }
    &.active {
      background-color: var(--player-theme);
      color: #ffffff;
    }
  }
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
      cursor: pointer;
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
