<template>
  <el-scrollbar view-style="padding: 0 20px;">
    <div class="flex">
      <!-- LEFT -->
      <div style="flex: 2">
        <h3 class="flex items-center">
          <el-link :underline="false" @click="$router.back()"><Left theme="outline" size="22"/>MV详情</el-link>
        </h3>
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
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import {Left, DownOne, UpOne, GoodTwo, FolderPlus, Share, Download} from "@icon-park/vue-next";
import {ref} from "vue";
import {useRoute} from "vue-router";
import {getMVDetail, getMVLikeCount, getMVUrl} from "@/api/mv";
import {MV, MVUrl} from "@/models/MV";
import useFormatCount from "@/utils/count";

const currentRoute = useRoute()
const mvId = currentRoute.params.id

const mvDetail = ref<MV>()
const likedCount = ref(0)
const mvUrl = ref<MVUrl>()

const showDesc = ref(false)

function getData() {
  getMVDetail(Number(mvId)).then(res => {
    mvDetail.value = res
  })
  getMVUrl(Number(mvId)).then(res => {
    mvUrl.value = res
  })
  getMVLikeCount(Number(mvId)).then(res => {
    likedCount.value = res.likedCount
  })
}

getData()
</script>

<style scoped>

</style>
