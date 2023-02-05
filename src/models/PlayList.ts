export interface PlayList {
    id: number
    name: string
    coverImgUrl: string
    createTime: number
    updateTime: number
    playCount: number
    creator: Creator
    tags: Array<string>
    trackCount: number
    tracks: Array<Tracks>
    userId: number
}

interface Creator {
    userId: number
    nickname: string
    avatarUrl: string
}

export interface Tracks {
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
    noCopyrightRcmd: {
        type: number
        typeDesc: string
    }
}
