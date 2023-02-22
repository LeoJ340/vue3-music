import {Song} from "@/models/Song";

export interface PlayList {
    id: number | undefined
    name: string
    copywriter: string
    coverImgUrl: string
    createTime: number
    updateTime: number
    playCount?: number
    playcount?: number
    creator: {
        userId: number
        nickname: string
        avatarUrl: string
    }
    tags: Array<string>
    trackCount: number
    tracks: Array<Song> | any
    userId: number
}

export interface TopList extends PlayList{
    tracks: Array<{
        first: string;
        second: string;
    }>
}
