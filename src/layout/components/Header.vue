<template>
  <span style="width: 180px;">网易云音乐</span>
  <el-row class="flex-1">
    <!-- 页头 -->
    <el-col :span="8" class="page-header">
      <Left theme="outline" size="18" fill="#ffffff" :strokeWidth="2" />
      <Right theme="outline" size="18" fill="#ffffff" :strokeWidth="2"/>
    </el-col>
    <!-- RIGHT -->
    <el-col :span="16"  class="flex-vertical-center justify-end setting">
      <!-- login -->
      <el-popover v-if="hasLogin" placement="bottom" trigger="click" :width="200" :offset="0">
        <template #reference>
          <span class="flex-vertical-center login-icon">
            <el-avatar :size="30" :src="userInfo.avatarUrl" />
            <span class="text-14">{{userInfo.userName}}</span>
            <DownOne theme="filled" size="18" :strokeWidth="2"/>
          </span>
        </template>
        <div style="cursor: pointer;" @click="exitLogin"><Power theme="filled" size="18" :strokeWidth="2"/>退出登录</div>
      </el-popover>

      <span v-else class="flex-vertical-center login-icon" @click="toLogin">
        <el-avatar :size="30" :src="userInfo.avatarUrl" />
        <span class="text-14">未登录</span>
        <DownOne theme="filled" size="18" :strokeWidth="2"/>
      </span>
      <!-- 主题切换 -->
      <el-popover placement="bottom-start" trigger="click" :width="300" :offset="20">
        <template #reference>
          <Theme class="action-icon" theme="outline" size="20" :strokeWidth="2"/>
        </template>
        <h6 class="m-0">主题</h6>
        <div class="theme-list">
          <div v-for="theme in themeList" class="theme-item relative"
               :style="{ background: theme.background }"
               @click="changeTheme(theme.key)">
            <span style="margin-left: 5px">{{theme.text}}</span>
            <CheckOne v-show="currentTheme === theme.key" theme="two-tone" size="22" :fill="['#fff' ,'#ec4141']" :strokeWidth="3"/>
          </div>
        </div>
      </el-popover>
      <SettingTwo class="action-icon" theme="outline" size="20" :strokeWidth="2"/>
      <Mail class="action-icon" theme="outline" size="20" :strokeWidth="2"/>
    </el-col>
  </el-row>

  <!-- 登录弹窗 -->
  <el-dialog v-model="loginVisible" width="30%" draggable :before-close="closeLogin">
    <div v-loading="qrImgLoading" class="text-center relative">
      <h1 class="m-0">扫码登录</h1>
      <div v-show="qrStatus === 801 || qrStatus === 800">
        <el-image v-if="qrImg" :src="qrImg" />
        <div v-show="qrStatus === 800" class="qr-invalid">
          <p>二维码已失效</p>
          <el-button size="small" type="primary" @click="toLogin">点击刷新</el-button>
        </div>
        <p class="m-0">
          使用 <a href="https://music.163.com/#/download" target="_blank" style="color: #409eff;">网易云音乐APP</a> 扫码登录
        </p>
      </div>
      <div v-show="qrStatus === 802">
        <el-image v-show="qrStatus === 802" :src="waiting" style="width: 180px; height: 180px;" />
        <p class="m-0">请在手机上确认登录</p>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import { Left, Right, DownOne, Theme, SettingTwo, Mail, Power, CheckOne } from '@icon-park/vue-next';
import {checkQR, getQR, getQrKey} from "@/api/login";
import {useUserStore} from "@/stores/user";
import {themeList} from "@/models/Theme";
import waiting from '@/assets/waiting-authorization.png'

const userStore = useUserStore()
const { hasLogin, userInfo } = storeToRefs(userStore)
const { getUserInfo, exitLogin } = userStore

onMounted(() => {
  getUserInfo()
})

const loginVisible = ref(false)
/**
 * 0：初始化
 * 800：二维码不存在或已过期
 * 801：等待扫码
 * 802：授权中
 * 803：授权成功
 */
const qrStatus = ref(0)
const qrImg = ref('')
const qrImgLoading = ref(false)
let timer: number

async function toLogin() {
  clearInterval(timer)
  loginVisible.value = true
  qrImgLoading.value = true
  const qrKey = await getQrKey()
  qrImg.value = await getQR(qrKey)
  timer = setInterval( async () => {
    try {
      const { code, cookie } = await checkQR(qrKey)
      qrStatus.value = code
      qrImgLoading.value = false
      if (code === 803) {
        sessionStorage.setItem('cookie',cookie)
        getUserInfo()
        clearInterval(timer)
        loginVisible.value = false
      }
      if (code === 800) {
        clearInterval(timer)
      }
    } catch (e) {
      clearInterval(timer)
      qrImgLoading.value = false
    }
  }, 2000)
}

function closeLogin() {
  loginVisible.value = false
  clearInterval(timer)
  qrStatus.value = 0
}

watch(loginVisible, val => {
  if (!val && timer) {
    clearInterval(timer)
  }
})

const currentTheme = ref('red')

function changeTheme(theme: string) {
  currentTheme.value = theme
  document.body.className = theme === 'red' ? '' : theme
}
</script>

<style lang="scss" scoped>
.setting {
  .login-icon {
    cursor: pointer;
    .el-avatar {
      margin-right: 5px;
    }
  }
  .action-icon {
    margin-left: 20px;
    display: flex;
    cursor: pointer;
  }
}
.theme-list {
  display: flex;
  flex-wrap: wrap;
  .theme-item {
    width: 30%;
    height: 80px;
    margin-top: 20px;
    margin-right: 5%;
    display: flex;
    align-items: flex-end;
    cursor: pointer;
    color: #ffffff;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .i-icon {
      position: absolute;
      right: -10px;
      bottom: -10px;
    }
  }
}
.qr-invalid {
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translate(-50%, 0px);
  width: 150px;
  height: 150px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
