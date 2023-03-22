<template>
  <!-- 登录弹窗 -->
  <el-dialog v-model="showLogin" width="30%" draggable :before-close="closeLogin">
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
import {checkQR, getQR, getQrKey} from "@/api/login";
import {useUserStore} from "@/stores/user";
import waiting from '@/assets/waiting-authorization.png'

const userStore = useUserStore()
const { showLogin } = storeToRefs(userStore)
const { getUserInfo } = userStore

onMounted(() => {
  getUserInfo()
})

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
  showLogin.value = true
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
        showLogin.value = false
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
  showLogin.value = false
  clearInterval(timer)
  qrStatus.value = 0
}

watch(showLogin, val => {
  if (val) {
    toLogin()
  }
  if (!val && timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>

</style>
