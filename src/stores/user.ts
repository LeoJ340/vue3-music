import { defineStore } from 'pinia'
import {reactive, ref} from "vue";
import {checkLogin, logout} from "@/api/login";
import {playList} from "@/api/user";
import {PlayList} from "@/models/PlayList";
import playlistDefaultCover from '@/assets/playlist-cover.png'

export const useUserStore = defineStore('user', () => {
    const hasLogin = ref(false)

    const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    const logoutUserInfo = {
        userId: 8023474819,
        userName: '0_m15849353741@163.com',
        avatarUrl: defaultAvatar
    }
    const userInfo = reactive({
        userId: logoutUserInfo.userId,
        userName: logoutUserInfo.userName,
        avatarUrl: logoutUserInfo.avatarUrl
    })

    function getUserInfo() {
        checkLogin().then(res => {
            const { profile } = res.data
            if (!profile) return
            userInfo.userId = profile.userId
            userInfo.userName = profile.nickname
            userInfo.avatarUrl = profile.avatarUrl
            hasLogin.value = true
            getMyPlayList()
        })
    }

    function exitLogin() {
        logout().then(_ => {
            sessionStorage.removeItem('cookie')
            hasLogin.value = false
            userInfo.userId = logoutUserInfo.userId
            userInfo.userName = logoutUserInfo.userName
            userInfo.avatarUrl = logoutUserInfo.avatarUrl
            myPlayList.value = [noPlayList]
        })
    }

    const noPlayList = {
        id: undefined,
        name: '我喜欢的音乐',
        coverImgUrl: playlistDefaultCover,
        createTime: 0,
        updateTime: 0,
        playCount: 0,
        creator: {
            userId: logoutUserInfo.userId,
            nickname: logoutUserInfo.userName,
            avatarUrl: logoutUserInfo.avatarUrl
        },
        tags: [],
        trackCount: 0,
        tracks: [],
        userId: logoutUserInfo.userId
    }
    const myPlayList = ref<PlayList[]>([noPlayList])

    function getMyPlayList() {
        playList(userInfo.userId).then(res => {
            const { playlist } = res
            myPlayList.value = playlist
        })
    }

    return {
        hasLogin, userInfo, getUserInfo, exitLogin,
        myPlayList
    }
})
