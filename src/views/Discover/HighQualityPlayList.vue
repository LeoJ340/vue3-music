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
    <CoverHorizontal
        :list="listData" :columns="3" :showPlayCount="true" playPlacement="bottom-right"
        v-slot="{ item }" @click="toPlayList">
      <span class="info-name">{{item.name}}</span>
      <p class="text-12 flex">
        by {{item.creator.nickname}}
        <el-image v-if="item.creator.avatarDetail" :src="item.creator.avatarDetail?.identityIconUrl" style="margin-left: 2px; width: 15px;" />
      </p>
      <p class="text-12">{{item.copywriter}}</p>
    </CoverHorizontal>
  </main>
</template>

<script setup lang="ts">
import CoverHorizontal from '@/components/CoverHorizontal/index.vue'
import {computed, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getHighQualityCategories, getTopPlayListsByHighQualityCategories} from "@/api/playlist";
import {HighQualityTag} from "@/models/Category";
import {PlayList} from "@/models/PlayList";
import {Help, Filter} from "@icon-park/vue-next";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/stores/app";

const { currentTheme } = storeToRefs(useAppStore())

const highQualityCategories = ref<HighQualityTag[]>([])
getHighQualityCategories().then(res => {
  highQualityCategories.value = res
})

const currentRoute = useRoute()
const cat = ref(currentRoute.query.cat || '全部')
const limit = 50

const playLists = reactive<PlayList[]>([])
// 过滤组件数据
const listData = computed(() => {
  return playLists.map(item => {
    return {
      id: item.id,
      coverImgUrl: item.coverImgUrl,
      playCount: item.playCount || item.playcount,
      name: item.name,
      creator: item.creator,
      copywriter: item.copywriter
    }
  })
})

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
</style>
