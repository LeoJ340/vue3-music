<template>
  <el-dialog
      v-model="visible"
      custom-class="to-playlist-dialog"
      width="30%"
      center
      draggable
  >
    <template #header>
      <div class="header">
        <h3>收藏到歌单</h3>
      </div>
    </template>
    <el-scrollbar view-style="height: 70%;">
      <div v-for="item in playList" class="flex playlist" @click="toPlaylist(item.id)">
        <el-image :src="item.coverImgUrl" fit="cover" />
        <div style="margin-left: 10px;">
          <p>{{item.name}}</p>
          <p>{{item.trackCount}}首音乐</p>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import {managerTracks} from "@/api/playlist";

const props = defineProps<{
  tracks: number[]
}>()

const visible = ref(false)
const { myPlayList, userInfo } = storeToRefs(useUserStore())

const playList = computed(() => {
  return myPlayList.value.filter(item => item.creator?.userId === userInfo.value.userId)
})

function show() {
  if (!playList.value.length) return
  visible.value = true
}

function toPlaylist(id: number) {
  managerTracks('add', id, props.tracks).then(() => {
    visible.value = false
    ElMessage({
        message: '已收藏到歌单',
        type: 'success',
        duration: 1000,
        center: true
    })
  })
}

defineExpose({
  show,
  tracks: props.tracks
})
</script>

<style scoped lang="scss">
.playlist {
  cursor: pointer;
  padding: 10px 20px;
  &:hover {
    background: rgb(238, 239, 240);
  }
  .el-image {
    width: 80px;
    height: 80px;
    border-radius: 10px;
  }
}
</style>
