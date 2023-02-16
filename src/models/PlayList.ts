import {Song} from "@/models/Song";

export interface PlayList {
    id: number | undefined
    name: string
    coverImgUrl: string
    createTime: number
    updateTime: number
    playCount: number
    creator: {
        userId: number
        nickname: string
        avatarUrl: string
    }
    tags: Array<string>
    trackCount: number
    tracks: Array<Song>
    userId: number
}
