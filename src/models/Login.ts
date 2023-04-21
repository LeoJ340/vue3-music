// 登录响应模型
export interface QRKeyRes {
    code: number
    data: {
        code: number
        unikey: string
    }
}

export interface QRImgRes {
    code: number
    data: {
        qrimg: string
        qrurl: string
    }
}

export interface CheckQRRes {
    code: number
    cookie: string
    message: string
}

export interface LoginStatus {
    data: {
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
        } | null
    }
}
