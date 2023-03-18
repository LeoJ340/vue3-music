import {Song} from "@/models/Song";

export interface PlayList {
    name: string
    id: number
    userId: number
    coverImgUrl: string
    coverImgId: number
    createTime: number
    updateTime: number
    description: string
    tags: Array<string>
    tag?: string
    trackUpdateTime: number
    trackCount: number
    playCount: number
    specialType: number
    totalDuration: number
    creator: Creator | null
    tracks: Array<Song> | any
    subscribed: boolean
    subscribers: []
    subscribedCount: number
    commentThreadId: string
    newImported: boolean
    adType: number
    highQuality: boolean
    privacy: number
    ordered: boolean
    shareCount?: number
    commentCount?: number
    copywriter?: string
}

interface Creator {
    followed: boolean
    avatarUrl: string
    avatarImgId: number
    city: number
    birthday: number
    userId: number
    userType: number
    nickname: string
    signature: string
    description: string
    detailDescription: string
    backgroundImgId: number
    backgroundUrl: string
    avatarDetail: {
        identityIconUrl: string
        identityLevel: number
        userType: number
    }
    anchor: boolean
}

export interface TopList extends PlayList{
    tracks: Array<{
        first: string;
        second: string;
    }>
}

export interface PersonalizedPlayList {
    id: number
    type: number
    name: string
    copywriter: string
    picUrl: string
    playCount: number
    trackCount: number
    trackNumberUpdateTime: number
    highQuality: boolean
    canDislike: boolean
    alg: string
}
