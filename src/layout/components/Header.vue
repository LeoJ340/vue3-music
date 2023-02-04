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
          <div v-for="(value, key) in themeList" class="theme-item" @click="changeTheme(key)">{{value}}</div>
        </div>
      </el-popover>
      <SettingTwo class="action-icon" theme="outline" size="20" :strokeWidth="2"/>
      <Mail class="action-icon" theme="outline" size="20" :strokeWidth="2"/>
    </el-col>
  </el-row>

  <!-- 登录弹窗 -->
  <el-dialog v-model="loginVisible" width="30%" draggable>
    <div class="text-center relative">
      <h1 class="m-0">扫码登录</h1>
      <el-image v-if="qrImg" :src="qrImg" />
      <!-- TODO：马赛克二维码 -->
      <div></div>
      <p v-if="qrStatus === 801 || qrStatus === 800" class="m-0">
        使用 <a href="https://music.163.com/#/download" target="_blank" style="color: #409eff;">网易云音乐APP</a> 扫码登录
      </p>
      <p v-if="qrStatus === 802" class="m-0">请在手机上确认登录</p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, toRefs, watch} from "vue";
import { Left, Right, DownOne, Theme, SettingTwo, Mail, Power } from '@icon-park/vue-next';
import {checkQR, getQR, getQrKey} from "@/api/login";
import {useUserStore} from "@/stores/user";

const { hasLogin, userInfo } = toRefs(useUserStore())
const { getUserInfo, exitLogin } = useUserStore()

onMounted(() => {
  getUserInfo()
})

const loginVisible = ref(false)
/**
 * 800：二维码不存在或已过期
 * 801：等待扫码
 * 802：授权中
 * 803：授权成功
 */
const qrStatus = ref(800)
const qrImg = ref('')
let timer: number

async function toLogin() {
  loginVisible.value = true
  const qrKey = await getQrKey()
  qrImg.value = await getQR(qrKey)
  timer = setInterval( async () => {
    try {
      const { code, cookie } = await checkQR(qrKey)
      qrStatus.value = code
      if (code === 803) {
        sessionStorage.setItem('cookie',cookie)
        getUserInfo()
        clearInterval(timer)
        loginVisible.value = false
      }
      if (code === 802) {
        // 授权中
      }
    } catch (e) {
      clearInterval(timer)
    }
  }, 2000)
}

watch(loginVisible, val => {
  if (!val && timer) {
    clearInterval(timer)
  }
})

const themeList = reactive({
  dark: '炫酷黑',
  red: '官方红',
  pink: '可爱粉'
})

function changeTheme(theme: string) {
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
  .theme-item {
    width: 100px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    cursor: pointer;
    &:hover {}
  }
}
</style>
