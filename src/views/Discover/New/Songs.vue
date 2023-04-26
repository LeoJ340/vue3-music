<template>
  <div class="flex justify-between">
    <div class="left">
      <span v-for="type in types" :class="{ active: type.key === currentType.key }" @click="selectType(type)">{{type.text}}</span>
    </div>
    <div class="right">
      <el-button type="primary" size="small" round @click="playAll"><PlayOne theme="filled" size="18" :strokeWidth="2"/>播放全部</el-button>
      <el-button size="small" round @click="selectPlayList" :disabled="!topSongs.length"><FolderPlus theme="outline" size="18" :strokeWidth="2"/>收藏全部</el-button>
    </div>
  </div>
  <!-- 列表 -->
  <el-table v-show="!noNetwork" v-loading="loading" element-loading-text="载入中..."
            :data="topSongs" stripe :show-header="false"
            tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }"
            @row-dblclick="dblclickPlay">
    <el-table-column type="index" width="50" />
    <el-table-column label="封面" :show-overflow-tooltip="true">
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
    <el-table-column label="歌手" width="180" :show-overflow-tooltip="true">
      <template #default="scope">
        <ArtistColumn :artists="scope.row.artists" />
      </template>
    </el-table-column>
    <el-table-column label="专辑" width="180" :show-overflow-tooltip="true">
      <template #default="scope">
        <el-link :underline="false" @click="toCommonAlbum(scope.row.album.id)">{{scope.row.album.name}}</el-link>
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
  <!-- 无网络显示 -->
  <NetLess v-show="noNetwork" />
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {getTopSongs} from "@/api/song";
import {Song, TopSong} from "@/models/Song";
import {PlayOne, FolderPlus} from "@icon-park/vue-next";
import ArtistColumn from '@/components/Songs/ArtistColumn.vue'
import {useFormatSeconds} from "@/utils/time";
import {usePlayerStore} from "@/stores/player";
import {useToSong} from "@/utils/typeFormate";
import NetLess from '@/components/NetLess/index.vue'
import { toPlayList } from "@/components/ToPlayList";
import {toCommonAlbum} from "@/router/usePush";

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
const noNetwork = ref(false)

function getData() {
  if (loading.value) return
  loading.value = true
  getTopSongs(currentType.value.key).then(res => {
    topSongs.value = res
  }).catch((reason: string) => {
    if (reason === '网络异常') {
      noNetwork.value = true
    }
  }).finally(() => {
    loading.value = false
  })
}

getData()

function selectPlayList() {
  toPlayList(topSongs.value.map(topSong => topSong.id))
}

function selectType(type: { key: number, text: string }) {
  topSongs.value.length = 0
  currentType.value = type
  getData()
}

/**
 * 播放（播放全部、双击播放）
 */
const { push, playImmediately } = usePlayerStore()
function playAll() {
  push(topSongs.value.map(useToSong), { replace: true, trigger: 'playAll' })
}

function dblclickPlay(song: Song) {
  if (song.noCopyrightRcmd) return
  const starIndex = topSongs.value.findIndex(item => item.id === song.id)
  push(topSongs.value.map(useToSong), { replace: true, starIndex, trigger: 'doubleClick' })
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
