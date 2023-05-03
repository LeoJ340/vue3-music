<template>
  <div class="screening-condition">
    <span>语种:</span>
    <span v-for="item in areas" :class="{ 'condition-item': true, active: item.key === params.area }">
      <el-link :underline="false" @click="selectArea(item.key)">{{item.text}}</el-link>
    </span>
  </div>
  <div class="screening-condition">
    <span>分类:</span>
    <span v-for="item in types" :class="{ 'condition-item': true, active: item.key === params.type }">
      <el-link :underline="false" @click="selectType(item.key)">{{item.text}}</el-link>
    </span>
  </div>
  <div class="initials-screening-condition">
    <span style="width: 160px;">筛选:</span>
    <div class="initials">
      <span v-for="item in initials" :class="{ 'condition-item': true, active: item === params.initial }">
        <el-link :underline="false" @click="selectInitial(item)">{{item}}</el-link>
      </span>
    </div>
  </div>
  <!-- 歌手列表 -->
  <div v-show="!noNetwork" v-loading="loading" element-loading-text="载入中..." class="artist-list">
    <div v-for="artist in artistList" class="artist-item" @click="toCommonArtist(artist.id)">
      <el-image :src="artist.img1v1Url"/>
      <el-link :underline="false" @click="toCommonArtist(artist.id)">{{artist.name}}</el-link>
      <!-- TODO：去用户页 -->
      <Me theme="outline" size="18" fill="#f54c43"/>
    </div>
  </div>
  <div v-show="more" class="flex-horizontal-center">
    <el-button type="primary" round :loading="loading" @click="loadMore">加载更多</el-button>
  </div>
  <!-- 无网络显示 -->
  <NetLess v-show="noNetwork" />
</template>

<script setup lang="ts">
import {reactive, readonly, ref} from "vue";
import {getArtistList} from "@/api/artist";
import {Artist} from "@/models/Artist";
import { Me } from "@icon-park/vue-next";
import NetLess from '@/components/NetLess/index.vue'
import {toCommonArtist} from "@/router/usePush";

const areas = [
  {
    key: -1,
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
  },
  {
    key: 0,
    text: '其他'
  }
]
const types = [
  {
    key: -1,
    text: '全部'
  },
  {
    key: 1,
    text: '男歌手'
  },
  {
    key: 2,
    text: '女歌手'
  },
  {
    key: 3,
    text: '乐队'
  }
]
const initials = ['热门', 'A', 'B', 'C', 'D', 'E', 'F','G', 'H', 'I','J', 'K', 'L','M', 'N', 'O','P', 'Q', 'R', 'S','T', 'U', 'V', 'W','X', 'Y', 'Z', '#']

const params = reactive({
  area: -1,
  type: -1,
  initial: '热门'
})

const page = ref(1)
const limit = readonly(ref(50))
const artistList = ref<Artist[]>([])
const more = ref(true)

function selectArea(area: number) {
  params.area = area
  page.value = 1
  artistList.value = []
  getData()
}

function selectType(type: number) {
  params.type = type
  page.value = 1
  artistList.value = []
  getData()
}

function selectInitial(initial: string) {
  params.initial = initial
  page.value = 1
  artistList.value = []
  getData()
}

const loading = ref(false)
const noNetwork = ref(false)

function getData() {
  if (loading.value) return
  loading.value = true
  getArtistList({
    page: page.value,
    limit: limit.value,
    area: params.area,
    type: params.type,
    initial: params.initial,
  }).then(res => {
    noNetwork.value = false
    artistList.value.push(...res.artists)
    more.value = res.more
  }).catch((reason: string) => {
    if (reason === '网络异常') {
      noNetwork.value = true
    }
  }).finally(() => {
    loading.value = false
  })
}

getData()

function loadMore() {
  page.value++
  getData()
}

</script>

<style scoped lang="scss">
.screening-condition {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  span {
    width: 80px;
    text-align: center;
  }
  .active {
    .el-link {
      color: var(--player-theme);
    }
  }
}
.initials-screening-condition {
  display: flex;
  flex-wrap: nowrap;
  span {
    width: 80px;
    text-align: center;
  }
  .condition-item {
    margin-bottom: 5px;
  }
  .active {
    .el-link {
      color: var(--player-theme);
    }
  }
  .initials {
    display: flex;
    flex-wrap: wrap;
  }
}
.condition-item {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.artist-list {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  .artist-item {
    .el-image {
      cursor: pointer;
    }
  }
  .i-icon-me {
    float: right;
    cursor: pointer;
  }
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  --el-color-primary: var(--player-theme);
}
</style>
