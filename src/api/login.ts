import {request} from "@/utils/request";
import {QRKeyRes, QRImgRes, CheckQRRes, LoginStatus} from "@/models/Login";

/**
 * 二维码登录
 */
export function getQrKey() {
    return new Promise<string>((resolve, reject) => {
        const data = { timestamp: Date.now() }
        request<QRKeyRes>('/login/qr/key', 'POST', { data }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data.unikey)
            } else {
                reject()
            }
        }).catch((reason: string) => {
            // 需要处理异常
            reject(reason)
        })
    })
}

export function getQR(key: string) {
    return new Promise<string>((resolve, reject) => {
        const data = { qrimg: true, key, timestamp: Date.now() }
        request<QRImgRes>('/login/qr/create', 'POST', { data }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data.qrimg)
            } else {
                reject()
            }
        }).catch((reason: string) => {
            // 需要处理异常
            reject(reason)
        })
    })
}

export function checkQR(key: string) {
    return new Promise<CheckQRRes>((resolve, reject) => {
        const data = { key, timestamp: Date.now() }
        request<CheckQRRes>('/login/qr/check', 'POST', { data }).then(res => {
            resolve(res)
        }).catch((reason: string) => {
            // 需要处理异常
            reject(reason)
        })
    })
}

/**
 * 登录状态
 */
export function checkLogin() {
    return new Promise<LoginStatus>((resolve, reject) => {
        request<LoginStatus>('/login/status', 'POST', { needLogin: true }).then(res => {
            const { code } = res.data
            if (code === 200) {
                resolve(res)
            } else {
                reject()
            }
        }).catch(() => {
            reject()
        })
    })
}

/**
 * 注销
 */
export function logout() {
    return new Promise<void>((resolve, reject) => {
        request<{ code: number }>('/logout', 'POST').then(res => {
            const { code } = res
            if (code === 200) {
                resolve()
            } else {
                reject()
            }
        })
    })
}
