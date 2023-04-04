import {loginRequest} from "@/utils/request";
import {QRKeyRes, QRImgRes, CheckQRRes, LoginStatus} from "@/models/Login";

/**
 * 二维码登录
 */
async function getQrKey() {
    const { data } = await loginRequest<QRKeyRes>('/login/qr/key', { timestamp: Date.now() })
    return data.unikey
}

async function getQR(key: string) {
    const { data } = await loginRequest<QRImgRes>('/login/qr/create', { qrimg: true, key, timestamp: Date.now() })
    return data.qrimg
}

async function checkQR(key: string) {
    return await loginRequest<CheckQRRes>('/login/qr/check', { key, timestamp: Date.now() })
}

/**
 * 登录状态
 */
async function checkLogin() {
    return await loginRequest<LoginStatus>('/login/status', { cookie: sessionStorage.getItem('cookie') })
}

/**
 * 注销
 */
async function logout() {
    const { code } = await loginRequest<{ code: number }>('/logout')
    if (code === 200) {
        return Promise.resolve()
    } else {
        return Promise.reject()
    }
}

export { getQrKey, getQR, checkQR, checkLogin, logout }

