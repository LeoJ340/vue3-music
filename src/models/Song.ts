export interface Song {
    id: number
    name: string
    al: {
        id: number
        name: string
        picUrl: string
    }
    alia: Array<string>
    ar: Array<{
        id: number
        name: string
    }>
    dt: number// 时长
    noCopyrightRcmd: {
        type: number
        typeDesc: string
    }
    publishTime: number
}
