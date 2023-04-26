<template>
  <el-aside width="200px">
    <el-scrollbar>
      <ul class="menu p-0">
        <li v-for="menuGroup in menuGroups" class="menu-group">
          <div v-if="menuGroup.title" class="menu-group-title flex justify-between">
            <span>{{menuGroup.title}}</span>
            <el-link v-if="menuGroup.title === '创建的歌单'" :underline="false" @click="toCreatePlayList">
              <Plus theme="filled" size="14" fill="#000000" :strokeWidth="1" />
            </el-link>
          </div>
          <router-link v-for="menuItem in menuGroup.list"
                       class="menu-item" :class="{ active: isActive(menuItem.path), 'not-need-login': !menuGroup.title }"
                       :to="menuItem.path">
            <Component :is="menuItem.icon" theme="outline" size="20" :strokeWidth="2" />
            <span class="menu-text">{{menuItem.text}}</span>
          </router-link>
        </li>
      </ul>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import {Like, MusicMenu, Lock, Plus, Time} from '@icon-park/vue-next';
import {computed, h, ref} from "vue";
import { useRouter } from "vue-router";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
import {createPlayList} from "@/api/playlist";
import {ElCheckbox} from "element-plus";

const userStore = useUserStore()
const { toLogin, getMyPlayList } = userStore
const { hasLogin, myPlayList } = storeToRefs(userStore)

const router = useRouter()

interface MenuGroup {
  title?: string
  list: Array<{
    path: string
    text: string
    icon? : any
  }>
}

const menuGroups = computed(() => {
  const group: Array<MenuGroup> = [
    {
      list: [
        {
          path: '/discover',
          text: '发现音乐'
        },
        {
          path: '/video',
          text: '视频'
        }
      ]
    },
    {
      title: '我的音乐',
      list: [
        {
          path: `/my/playlist/${myPlayList.value.liked.id}`,
          text: '我喜欢的音乐',
          icon: Like
        },
        {
          path: `/my/recent`,
          text: '最近播放',
          icon: Time
        }
      ]
    }
  ]
  if (hasLogin) {
    // 创建的歌单
    group.push({
      title: '创建的歌单',
      list: myPlayList.value.created.map(item => {
        return {
          path: `/my/playlist/${item.id}`,
          text: item.name,
          icon: item.privacy ? Lock : MusicMenu
        }
      })
    })
    // 收藏的歌单
    if (myPlayList.value.collected.length) {
      group.push({
        title: '收藏的歌单',
        list: myPlayList.value.collected.map(item => {
          return {
            path: `/common/playlist/${item.id}`,
            text: item.name,
            icon: MusicMenu
          }
        })
      })
    }
  }
  return group
})

function isActive(path: string) {
  return router.currentRoute.value.fullPath.includes(path)
}

const isPrivacy = ref<boolean | string | number>(false)
function toCreatePlayList() {
  if (!hasLogin.value) {
    toLogin()
    return
  }
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
  }).then(({ value }) => {
    createPlayList(value, isPrivacy.value as boolean).then(() => {
      getMyPlayList()
      ElMessage({
        message: '歌单创建成功！',
        type: 'success',
        duration: 1000,
        center: true
      })
    })
  }).catch(() => {})
}
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: var(--main-bg);
  border-right: 1px solid var(--aside-border-right);
  .menu {
    .menu-group-title {
      margin-top: 20px;
      margin-bottom: 10px;
      padding: 0 20px;
      font-size: 14px;
      color: rgb(169, 169, 169);
    }
    .menu-item {
      display: flex;
      align-items: center;
      padding: 10px 20px 10px 20px;
      color: var(--main-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &.active, &:hover {
        background-color: var(--aside-active-bg);
        color: var(--aside-active-text);
      }
      &.active.not-need-login {
        font-size: 18px;
        font-weight: 600;
      }
      .menu-text {
        margin-left: 5px;
      }
    }
  }
}
</style>
