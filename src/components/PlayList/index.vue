<template>
  <el-scrollbar>
    <!-- 歌单信息 -->
    <div v-if="playlistInfo.name" class="flex" style="margin: 20px;">
      <el-image :src="playlistInfo.coverImgUrl" class="coverImage" />
      <div class="flex-1" style="margin-left: 20px;">
        <h2>{{playlistInfo.name}}</h2>
        <div class="flex-vertical-center">
          <el-avatar :src="playlistInfo.creator.avatarUrl" />
          <span style="margin-left: 10px; font-size: 12px;">{{playlistInfo.creator.nickname}}</span>
          <span v-if="playlistInfo.updateTime"
                style="margin-left: 10px; font-size: 12px; color: #a4a4a4;">
            最近更新{{useFormatTime(playlistInfo.updateTime)}}
          </span>
          <span v-else
                style="margin-left: 10px; font-size: 12px; color: #a4a4a4;">
            {{useFormatTime(playlistInfo.createTime)}}创建
          </span>
        </div>
        <!-- 操作按钮组 -->
        <div class="flex" style="margin: 15px 0;">
          <el-button-group>
            <el-button type="primary" round :disabled="!songs.length" @click="playAll"><PlayOne theme="filled" size="22" />播放全部</el-button>
            <el-button type="primary" round :disabled="!songs.length" @click="playAll(false)"><Plus theme="filled" size="20" :strokeWidth="3" /></el-button>
          </el-button-group>
          <el-button round :disabled="!songs.length"><FolderPlus theme="outline" size="20" :strokeWidth="2"/>收藏</el-button>
          <el-button round :disabled="!songs.length"><Share theme="outline" size="20" :strokeWidth="2"/>分享</el-button>
          <el-button round :disabled="!songs.length"><Download theme="outline" size="20" :strokeWidth="2"/>下载全部</el-button>
        </div>
        <div class="text-14">
          <span>歌曲：{{playlistInfo.trackCount}}</span>
          <span style="margin-left: 10px;">播放：{{useFormatCount(playlistInfo.playCount)}}</span>
        </div>
        <div class="flex justify-between text-14" style="margin-top: 2px;">
          <div>
            <span>简介：{{playlistInfo.description.split('\n')[0]}}</span>
            <p v-show="collapse" v-html="playlistInfo.description.split('\n').slice(1,playlistInfo.description.split('\n').length).join('<br>')"></p>
          </div>
          <Component
              v-if="playlistInfo.description.split('\n').length > 1"
              :is="collapse ? UpOne : DownOne"
              theme="filled" size="20" :strokeWidth="3"
              @click="collapse = !collapse"
          />
        </div>
      </div>
    </div>
    <div></div>
    <!-- 歌单列表 -->
    <el-table
        :data="songs"
        stripe tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }"
        @row-dblclick="dblclickPlay">
      <el-table-column label="" width="50" align="center">
        <template #default="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <div style="display: flex; justify-content: space-around;">
            <el-link :underline="false" title="喜欢">
              <Like v-if="myPlayListIds.includes(scope.row.id)" theme="filled" size="20" fill="#ec4141" :strokeWidth="2"/>
              <Like v-else theme="outline" size="20" :strokeWidth="2"/>
            </el-link>
            <el-link :underline="false">
              <Download theme="outline" size="20" :strokeWidth="2"/>
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标题" show-overflow-tooltip>
        <template #default="scope">
          <span>{{scope.row.name}}</span>
          <span v-if="scope.row.alia.length" style="color:#919192;">（{{scope.row.alia.join('')}}）</span>
          <span v-if="scope.row.noCopyrightRcmd">无音源</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手" show-overflow-tooltip>
        <template #default="scope">
          <span>{{scope.row.ar.map(ar => ar.name).join('/')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="专辑" show-overflow-tooltip>
        <template #default="scope">
          <router-link :to="`/playlist/${scope.row.al.id}`">
            {{scope.row.al.name}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="100">
        <template #default="scope">
          <span>{{useFormatSeconds(scope.row.dt / 1000)}}</span>
        </template>
      </el-table-column>
      <!-- 空数据 -->
      <template #empty="scope">
        <el-empty description="暂无音乐" />
      </template>
    </el-table>
  </el-scrollbar>
</template>

<script setup lang="ts">
import {PropType, ref} from "vue";
import {PlayList} from "@/models/PlayList";
import {Song} from "@/models/Song";
import { useFormatSeconds, useFormatTime } from "@/utils/time";
import { PlayOne, Plus, FolderPlus, Share, Download, DownOne, UpOne, Like } from '@icon-park/vue-next';
import { usePlayerStore } from "@/stores/player";
import useFormatCount from "@/utils/count";
import { useUserStore } from "@/stores/user";
import {storeToRefs} from "pinia";

const { playlistInfo, songs } = defineProps({
  playlistInfo: {
    type: Object as PropType<PlayList>,
    required: true
  },
  songs: {
    type: Array as PropType<Song[]>,
    required: true
  }
})

// 简介下拉完全展示
const collapse = ref(false)

const { myPlayList } = storeToRefs(useUserStore())
const myPlayListIds = myPlayList.value.map(item => item.id)

const { push } = usePlayerStore()
function playAll(replace: boolean = true) {
  push(songs.filter(item => !item.noCopyrightRcmd), { replace, trigger: 'playAll' })
}

function dblclickPlay(song: Song) {
  if (song.noCopyrightRcmd) return
  const starIndex = songs.findIndex(item => item.id === song.id)
  push(songs.filter(item => !item.noCopyrightRcmd), { replace: true, starIndex, trigger: 'doubleClick' })
}
</script>

<style lang="scss" scoped>
.coverImage {
  width: 320px;
  height: 320px;
}
</style>
