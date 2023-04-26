import {Artist} from "@/models/Artist";

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

export interface TopSong{
    id: number
    name: string
    duration: number
    album: {
        company: string
        status: number
        tags: string
        alias: string[]
        artists: Artist[]
        pic: number
        companyId: number
        picId: number
        publishTime: number
        picUrl: string
        blurPicUrl: string
        subType: string
        description: string
        name: string
        id: number
        type: string
        size: number
        picId_str: string
    }
    alias: string[]
    artists: Artist[]
}

export interface SongUrl {
    id: number
    url: string
    type: string
    size: number
    time: number
}

export interface RecentSong {
    resourceId: string
    playTime: number
    resourceType: string
    data: Song
    banned: boolean
    multiTerminalInfo: {
        icon: string
        osText: string
    }
}
