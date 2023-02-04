import request from "@/utils/request";


/**
 * 二维码登录
 */
interface QRKeyRes {
    code: number
    data: {
        code: number
        unikey: string
    }
}

async function getQrKey() {
    const { data } = await request.get<QRKeyRes>('/login/qr/key', { timestamp: Date.now() })
    return data.unikey
}

interface QRImgRes {
    code: number
    data: {
        qrimg: string
        qrurl: string
    }
}

async function getQR(key: string) {
    const { data } = await request.get<QRImgRes>('/login/qr/create', { qrimg: true, key })
    return data.qrimg
}

interface CheckQRRes {
    code: number
    cookie: string
    message: string
}

async function checkQR(key: string) {
    return await request.get<CheckQRRes>('/login/qr/check', { key, timestamp: Date.now() })
}

interface LoginStatus {
    code: number
    account: {
        id: number
        userName: string
        createTime: number
    }
    profile: {
        userId: number
        nickname: string
        avatarUrl: string
    }
}

/**
 * 登录状态
 */
async function checkLogin() {
    return await request.get<{ data: LoginStatus }>(`/login/status?cookie=${sessionStorage.getItem('cookie')}`)
}

/**
 * 注销
 */
async function logout() {
    const { code } = await request.get<{ code: number }>('/logout')
    if (code === 200) {
        return Promise.resolve()
    } else {
        return Promise.reject()
    }
}

export { getQrKey, getQR, checkQR, checkLogin, logout }

