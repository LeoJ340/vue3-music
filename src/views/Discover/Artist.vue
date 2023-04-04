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
  <!-- TODO：无限滚动 -->
  <div class="artist-list">
    <div v-for="artist in artistList" class="artist-item" @click="toArtist(artist.id)">
      <el-image :src="artist.img1v1Url"/>
      <span>{{artist.name}}</span>
      <Me theme="outline" size="18" fill="#f54c43"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, readonly, ref} from "vue";
import {getArtistList} from "@/api/artist";
import {Artist} from "@/models/Artist";
import { Me } from "@icon-park/vue-next";
import {useRouter} from "vue-router";

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

function selectArea(area: number) {
  params.area = area
  page.value = 1
  getData()
}

function selectType(type: number) {
  params.type = type
  page.value = 1
  getData()
}

function selectInitial(initial: string) {
  params.initial = initial
  page.value = 1
  getData()
}

function getData() {
  getArtistList({
    page: page.value,
    limit: limit.value,
    area: params.area,
    type: params.type,
    initial: params.initial,
  }).then(res => {
    artistList.value = res
  })
}

getData()

const router = useRouter()
function toArtist(id: number) {
  router.push(`/artist/${id}`)
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
    cursor: pointer;
  }
  .i-icon-me {
    float: right;
  }
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  --el-color-primary: var(--player-theme);
}
</style>
