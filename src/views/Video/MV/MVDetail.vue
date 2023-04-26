<template>
  <el-scrollbar view-style="padding: 0 20px;">
    <div v-show="!noNetwork" class="flex">
      <!-- LEFT -->
      <div style="flex: 2">
        <div class="flex-vertical-center">
          <a @click="$router.back()">
            <h3><Left theme="outline" size="22" style="vertical-align: bottom;"/>MV详情</h3>
          </a>
        </div>
        <video v-if="mvDetail" controls autoplay style="width: 90%;">
          <source :src="mvUrl?.url" type="video/mp4">
        </video>
        <div class="flex items-center" style="margin: 10px 0;">
          <el-avatar :src="mvDetail?.artists[0].img1v1Url" />
          <span style="margin-left: 5px;">{{mvDetail?.artists.map(item => item.name).join('/')}}</span>
        </div>
        <h2>
          {{mvDetail?.name}}
          <Component :is="showDesc ? DownOne : UpOne"
                     theme="filled" size="22"
                     style="margin-left: 10px;cursor: pointer;"
                     @click="showDesc = !showDesc"
          />
        </h2>
        <p class="text-14">
          <span>发布：{{mvDetail?.publishTime}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>播放：{{useFormatCount(mvDetail?.playCount)}}次</span>
        </p>
        <p v-show="showDesc">{{mvDetail?.desc}}</p>
        <div class="flex items-center">
          <el-button round><GoodTwo theme="outline" size="20" :strokeWidth="2"/>赞({{likedCount}})</el-button>
          <el-button round><FolderPlus theme="outline" size="20" :strokeWidth="2"/>收藏({{mvDetail?.subCount}})</el-button>
          <el-button round><Share theme="outline" size="20" :strokeWidth="2"/>分享({{mvDetail?.shareCount}})</el-button>
          <el-button round><Download theme="outline" size="20" :strokeWidth="2"/>下载MV</el-button>
        </div>
      </div>
      <!-- RIGHT -->
      <div style="flex: 1">
        <h3>相关推荐</h3>
        <Cover v-for="item in relatedVideos"
               mode="horizontal" :image-url="item.coverUrl" image-size="200px" :play-count="item.playTime"
        >
          <el-link :underline="false">{{item.title}}</el-link>
          <!-- TODO：用户页 -->
          <p class="text-12 flex-vertical-center">
            by&nbsp;&nbsp;<ArtistColumn :artists="item.creator.map(user => { return { id: user.userId, name: user.userName } })" />
          </p>
        </Cover>
      </div>
    </div>
    <!-- 无网络显示 -->
    <NetLess v-show="noNetwork" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import Cover from '@/components/Cover/index.vue'
import ArtistColumn from '@/components/Songs/ArtistColumn.vue'
import NetLess from '@/components/NetLess/index.vue'
import {Left, DownOne, UpOne, GoodTwo, FolderPlus, Share, Download} from "@icon-park/vue-next";
import {ref} from "vue";
import {useRoute} from "vue-router";
import {getMVDetail, getMVLikeCount, getMVUrl, getRelatedVideos} from "@/api/mv";
import {MV, MVUrl} from "@/models/MV";
import useFormatCount from "@/utils/count";
import {Video} from "@/models/Video";

const currentRoute = useRoute()
const mvId = ref(currentRoute.params.id)

const mvDetail = ref<MV>()
const likedCount = ref(0)
const mvUrl = ref<MVUrl>()
const relatedVideos = ref<Video[]>()

const showDesc = ref(false)

const noNetwork = ref(false)

function getData() {
  getMVDetail(Number(mvId.value)).then(res => {
    noNetwork.value = false
    mvDetail.value = res
  }).catch(reason => {
    if (reason === '网络异常') {
      noNetwork.value = true
    }
  })
  getMVUrl(Number(mvId.value)).then(res => {
    mvUrl.value = res
  })
  getMVLikeCount(Number(mvId.value)).then(res => {
    likedCount.value = res.likedCount
  })
  getRelatedVideos(Number(mvId.value)).then(res => {
    relatedVideos.value = res
  })
}

getData()
</script>

<style scoped>

</style>
