import {useRouter} from "vue-router";
import { defineStore } from 'pinia'
import {reactive, ref} from "vue";
import {checkLogin, logout} from "@/api/login";
import {playList} from "@/api/user";
import {PlayList} from "@/models/PlayList";

const router = useRouter()

export const useUserStore = defineStore('user', () => {
    const hasLogin = ref(false)
    const showLogin = ref(false)

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

    function toLogin() {
        if (hasLogin.value) return
        showLogin.value = true
    }

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
        logout().then(() => {
            sessionStorage.removeItem('cookie')
            hasLogin.value = false
            userInfo.userId = logoutUserInfo.userId
            userInfo.userName = logoutUserInfo.userName
            userInfo.avatarUrl = logoutUserInfo.avatarUrl
            router.push('/')
        }).catch(() => {
            ElMessage({
                message: '登出失败',
                type: 'error',
                duration: 1000,
                center: true
            })
        })
    }

    const myPlayList = ref<PlayList[]>([])

    function getMyPlayList() {
        playList(userInfo.userId).then(res => {
            myPlayList.value = res
        })
    }

    return {
        hasLogin, userInfo, showLogin,
        toLogin, getUserInfo, exitLogin,
        getMyPlayList, myPlayList
    }
})
