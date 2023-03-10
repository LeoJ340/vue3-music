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
        avatarDetail: {
            identityIconUrl: string
            identityLevel: number
            userType: number
        }
    }
    description: string
    tags: Array<string>
    trackCount: number
    tracks: Array<Song> | any
    userId: number
    privacy: number
}

export interface TopList extends PlayList{
    tracks: Array<{
        first: string;
        second: string;
    }>
}
