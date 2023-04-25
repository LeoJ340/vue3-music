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
      <div class="flex add" @click="toCreate">
        <Plus theme="filled" size="50" fill="#ec4141" :strokeWidth="1" class="icon flex-center" />
        <div class="flex-vertical-center" style="margin-left: 10px;">创建为新歌单</div>
      </div>
      <div v-for="item in myPlayList.created" class="flex playlist" @click="toPlaylist(item.id)">
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
import { Plus } from '@icon-park/vue-next';
import {h, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import {managerTracks, createPlayList} from "@/api/playlist";
import {ElCheckbox} from "element-plus";

const props = defineProps<{
  tracks: number[]
}>()

const visible = ref(false)

const userStore = useUserStore()
const { getMyPlayList } = userStore
const { myPlayList } = storeToRefs(userStore)

function show() {
  if (!myPlayList.value.created.length) return
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

const isPrivacy = ref<boolean | string | number>(false)
function toCreate() {
  ElMessageBox.prompt(() => h(ElCheckbox, {
    modelValue: isPrivacy.value,
    label: '设置为隐私歌单',
    "onUpdate:modelValue": (val) => {
      isPrivacy.value = val
    }
  }), '新建歌单', {
    confirmButtonText: '创建',
    showCancelButton: false,
    inputPattern: /^[^@#]+$/,
    inputErrorMessage: '歌单名不能包含@或#',
    center: true,
    roundButton: true,
    draggable: true
  }).then(async ({ value }) => {
    const id = await createPlayList(value, isPrivacy.value as boolean)
    managerTracks('add', id, props.tracks).then(() => {
      visible.value = false
      ElMessage({
        message: '已收藏到歌单',
        type: 'success',
        duration: 1000,
        center: true
      })
      getMyPlayList()
    })
  }).catch(() => {})
}

defineExpose({
  show,
  tracks: props.tracks
})
</script>

<style scoped lang="scss">
.add {
  padding: 10px 20px;
  cursor: pointer;
  .icon {
    width: 80px;
    height: 80px;
    background: var(--main-bg-light);
  }
}
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
