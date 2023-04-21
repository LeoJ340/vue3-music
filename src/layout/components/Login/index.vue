<template>
  <!-- 登录弹窗 -->
  <el-dialog v-model="showLogin" width="30%" draggable :before-close="closeLogin">
    <div v-loading="qrImgLoading" class="text-center relative">
      <h1 class="m-0">扫码登录</h1>
      <div v-show="qrStatus === 801 || qrStatus === 800" class="relative">
        <el-image v-if="qrImg" :src="qrImg" />
        <div v-show="qrStatus === 800" class="qr-invalid">
          <p style="margin-top: 60px;">二维码已失效</p>
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

let qrKey = ''
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
  try {
    qrKey = await getQrKey()
    qrImg.value = await getQR(qrKey)
    timer = setInterval(checkQRHandler, 2000)
  } catch (e) {
    ElMessage({
      message: e === '网络异常' ? '网络异常' : '系统异常',
      type: 'error',
      duration: 1000,
      center: true
    })
    qrImgLoading.value = false
    showLogin.value = false
  }
}

// 定时检查二维码状态
async function checkQRHandler() {
  try {
    const { code, cookie } = await checkQR(qrKey)
    qrStatus.value = code
    qrImgLoading.value = false
    if (code === 803) {
      sessionStorage.setItem('cookie', cookie)
      getUserInfo()
      clearInterval(timer)
      showLogin.value = false
    }
    if (code === 800) {
      clearInterval(timer)
    }
  } catch (e) {
    ElMessage({
      message: e === '网络异常' ? '网络异常' : '系统异常',
      type: 'error',
      duration: 1000,
      center: true
    })
    clearInterval(timer)
    qrImgLoading.value = false
  }
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
.qr-invalid {
  position: absolute;
  top: 0;
  left: 50%;
  width: 180px;
  height: 180px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  transform: translate(-50%, 0);
}
</style>
