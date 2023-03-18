<template>
  <el-aside width="200px">
    <el-scrollbar>
      <ul class="menu p-0">
        <li v-for="menuGroup in menuGroups" class="menu-group">
          <div v-if="menuGroup.title" class="menu-group-title">{{menuGroup.title}}</div>
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
import { useRouter } from "vue-router";
import { Like, Download, MusicMenu, Lock } from '@icon-park/vue-next';
import {useUserStore} from "@/stores/user";
import {computed} from "vue";
import {storeToRefs} from "pinia";

const { hasLogin, userInfo, myPlayList } = storeToRefs(useUserStore())

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
          path: `/my/playlist/${myPlayList.value[0]?.id}`,
          text: '我喜欢的音乐',
          icon: Like
        }
      ]
    }
  ]
  if (hasLogin) {
    group[1].list.push({
      path: '/my/cloud',
      text: '我的音乐云盘',
      icon: Download
    })
    const createPlaylist = myPlayList.value.slice(1, myPlayList.value.length).filter(item => item.creator?.userId === userInfo.value.userId).map(item => {
      return {
        path: `/my/playlist/${item.id}`,
        text: item.name,
        icon: item.privacy ? Lock : MusicMenu
      }
    })
    group.push({
      title: '创建的歌单',
      list: createPlaylist
    })
    const favorPlaylist = myPlayList.value.slice(1, myPlayList.value.length).filter(item => item.creator?.userId !== userInfo.value.userId).map(item => {
          return {
            path: `/playlist/${item.id}`,
            text: item.name,
            icon: MusicMenu
          }
        })
    if (favorPlaylist.length) {
      group.push({
        title: '收藏的歌单',
        list: favorPlaylist
      })
    }
  }
  return group
})

function isActive(path: string) {
  return router.currentRoute.value.fullPath.includes(path)
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
      padding-left: 20px;
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
