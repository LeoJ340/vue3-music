<template>
  <!-- 专辑布局 -->
  <div class="relative">
    <el-button-group class="layout-type">
      <el-button v-for="layout in layoutTypes"
                 :title="layout.type"
                 :color="curLayout.type === layout.type ? '#BFBFBF' : '#F2F2F2'"
                 :style="{ color: curLayout.type === layout.type ? '#ffffff' : '#000000' }"
                 size="small" :icon="layout.icon" @click="changeLayout(layout.type)"
      />
    </el-button-group>

    <!-- 专辑列表（大图模式） -->
    <div v-show="curLayout.type === '大图模式'" class="grid-col5 list">
      <Cover v-for="album in albums" :key="album.id"
             mode="vertical" :image-url="album.blurPicUrl"
             icon-placement="center" icon-transition="el-fade-in-linear"
             @click="toCommonAlbum(album.id)">
        <el-link :underline="false" @click="toCommonAlbum(album.id)">{{album.name}}</el-link>
        <div class="text-12" style="margin-top: 5px;">{{useFormatTime(album.publishTime)}}</div>
      </Cover>
    </div>
    <!-- 专辑列表（列表模式） -->
    <div v-show="curLayout.type === '列表模式'">
      <el-table :data="albums" stripe :show-header="false"
                tooltip-effect="light" :tooltip-options="{ placement: 'bottom-end' }">
        <el-table-column label="封面" width="100">
          <template #default="scope">
            <Cover mode="horizontal" :image-url="scope.row.blurPicUrl" image-size="80px" @click="toCommonAlbum(scope.row.id)" />
          </template>
        </el-table-column>
        <el-table-column label="专辑名" :show-overflow-tooltip="true">
          <template #default="scope">
            <div>
              {{scope.row.name}}
              <span v-if="scope.row.alias.length">（{{scope.row.alias.join()}}）</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="歌曲数量" width="200">
          <template #default="scope">
            <div>{{scope.row.size}}首</div>
          </template>
        </el-table-column>
        <el-table-column label="时长" width="200">
          <template #default="scope">
            <span>发布时间：{{useFormatTime(scope.row.publishTime)}}</span>
          </template>
        </el-table-column>
        <!-- 空数据 -->
        <template #empty="scope">
          <el-empty description="暂无专辑" />
        </template>
      </el-table>
    </div>

  </div>
</template>

<script setup lang="ts">
import Cover from '@/components/Cover/index.vue'
import { AllApplication, HamburgerButton, ListCheckbox } from '@icon-park/vue-next';
import {reactive, ref, shallowRef} from "vue";
import {useRoute} from "vue-router";
import {getArtistAlbums} from "@/api/artist";
import {Album} from "@/models/Album";
import {useFormatTime} from "@/utils/time";
import {toCommonAlbum} from "@/router/usePush";

/**
 * 专辑页布局切换
 */
const layoutTypes = reactive([
  {
    type: '大图模式',
    icon: shallowRef(AllApplication)
  },
  {
    type: '列表模式',
    icon: shallowRef(HamburgerButton)
  },
  {
    type: '图列模式',
    icon: shallowRef(ListCheckbox)
  }
])
const curLayout = ref(layoutTypes[0])

function changeLayout(layout: string) {
  curLayout.value = layoutTypes.find(item => item.type === layout)!
}
/**
 * 获取数据
 */
const currentRoute = useRoute()
const artistId = ref(currentRoute.params.id)
const limit = ref(30)
const page = ref(1)

const albums = ref<Album[]>()
function getData() {
  getArtistAlbums(Number(artistId.value), limit.value, page.value).then(res => {
    albums.value = res
  })
}

getData()
</script>

<style scoped lang="scss">
.layout-type {
  position: absolute;
  right: 40px;
  top: -40px;

}
.list {
  padding: 20px 40px;
}
</style>
