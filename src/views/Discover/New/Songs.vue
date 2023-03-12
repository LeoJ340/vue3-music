<template>
  <div class="flex justify-between">
    <div class="left">
      <span v-for="type in types" :class="{ active: type.key === currentType.key }" @click="selectType(type)">{{type.text}}</span>
    </div>
    <div class="right">
      <el-button type="primary" size="small" round @click="playAll"><PlayOne theme="filled" size="18" :strokeWidth="2"/>播放全部</el-button>
      <el-button size="small" round><FolderPlus theme="outline" size="18" :strokeWidth="2"/>收藏全部</el-button>
    </div>
  </div>
  <!-- 列表 -->
  <el-table v-loading="loading" element-loading-text="载入中..." :data="topSongs" stripe :show-header="false" tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }">
    <el-table-column type="index" width="50" />
    <el-table-column label="封面" show-overflow-tooltip>
      <template #default="scope">
        <div class="cover">
          <div class="cover-img" @click="playImmediately(useToSong(scope.row))">
            <el-image :src="scope.row.album.picUrl" lazy/>
            <PlayOne theme="filled" size="22" :strokeWidth="2"/>
          </div>
          <span>{{scope.row.name}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="歌手" width="180" show-overflow-tooltip>
      <template #default="scope">
        <span>{{scope.row.artists.map(artist => artist.name).join('/')}}</span>
      </template>
    </el-table-column>
    <el-table-column label="专辑" width="180" show-overflow-tooltip>
      <template #default="scope">
        <span style="cursor: pointer" @click="toPlayList(scope.row.album.id)">{{scope.row.album.name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="时长" width="100">
      <template #default="scope">
        <span>{{useFormatSeconds(scope.row.duration / 1000)}}</span>
      </template>
    </el-table-column>
    <!-- 空数据 -->
    <template #empty="scope">
      <el-empty description="暂无音乐" />
    </template>
  </el-table>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {getTopSongs} from "@/api/song";
import {TopSong} from "@/models/Song";
import {PlayOne, FolderPlus} from "@icon-park/vue-next";
import {useFormatSeconds} from "@/utils/time";
import {usePlayerStore} from "@/stores/player";
import {useToSong} from "@/utils/typeFormate";

const router = useRouter()

const types = [
  {
    key: 0,
    text: '全部'
  },
  {
    key: 7,
    text: '华语'
  },
  {
    key: 96,
    text: '欧美'
  },
  {
    key: 8,
    text: '日本'
  },
  {
    key: 16,
    text: '韩国'
  }
]

const currentType = ref(types[0])
const topSongs = ref<TopSong[]>([])
const loading = ref(false)

function getData() {
  loading.value = true
  getTopSongs(currentType.value.key).then(res => {
    topSongs.value = res
  }).finally(() => {
    loading.value = false
  })
}

getData()

function selectType(type: { key: number, text: string }) {
  topSongs.value.length = 0
  currentType.value = type
  getData()
}

const { push, playImmediately } = usePlayerStore()
function playAll() {
  push(topSongs.value.map(useToSong), true)
}

function toPlayList(id: number) {
  router.push(`/playlist/${id}`)
}

</script>

<style scoped lang="scss">
.left {
  display: flex;
  span {
    width: 60px;
    cursor: pointer;
    &.active {
      color: var(--player-theme);
    }
  }
}
.el-table {
  margin-top: 10px;
}
.cover {
  display: flex;
  align-items: center;
  &-img {
    position: relative;
    margin-right: 10px;
    cursor: pointer;
    .el-image {
      width: 80px;
    }
    .i-icon-play-one{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.8);
      color: var(--player-theme);
      border-radius: 50%;
    }
  }
}
</style>
