import { defineStore } from 'pinia'
import {reactive, ref} from "vue";
import {checkLogin, logout} from "@/api/login";
import {playList} from "@/api/user";
import {PlayList} from "@/models/PlayList";

export const useUserStore = defineStore('user', () => {
    const hasLogin = ref(false)

    const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    const userInfo = reactive({
        userId: '',
        userName: '',
        avatarUrl: defaultAvatar
    })

    function getUserInfo() {
        checkLogin().then(res => {
            const { profile } = res.data
            if (!profile) return
            userInfo.userId = String(profile.userId)
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
            userInfo.userId = ''
            userInfo.userName = ''
            userInfo.avatarUrl = defaultAvatar
        })
    }

    const myPlayList = ref<PlayList[]>([])

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