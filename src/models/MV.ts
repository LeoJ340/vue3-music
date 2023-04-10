import {Artist} from "@/models/Artist";
import {VideoGroup} from "@/models/Video";

export interface MV {
    id: number
    cover: string
    name: string
    playCount: number
    subCount: number
    shareCount: number
    commentCount: number
    briefDesc: string | null
    desc: string | null
    artistName: string
    artistId: number
    duration: number
    artists: Array<Artist>
    alias?: Array<string>
    videoGroup?: Array<VideoGroup>
    commentThreadId?: string
    publishTime?: string
}

export interface TopMV extends MV{
    mv: {
        authId: number
        status: number
        id: number
        title: string
        subTitle: string
        appTitle: string
        aliaName: string
        transName: string
        pic4v3: number
        pic16v9: number
        caption: number
        captionLanguage: string
        style: unknown
        mottos: string
        oneword: unknown
        appword: string
        stars: unknown
        desc: string
        area: string
        type: string
        subType: string
        neteaseonly: number
        upban: number
        topWeeks: string
        publishTime: string
        online: number
        score: number
        plays: number
        monthplays: number
        weekplays: number
        dayplays: number
        fee: number
        artists: Array<Artist>
        videos: Array<unknown>
    },
    lastRank: number
    score: number
}

export interface MVUrl {
    id: number
    url: string
    r: number
    size: number
    md5: string
    code: number
    expi: number
    fee: number
    mvFee: number
    st: number
    promotionVo?: any
    msg: string
}

export interface PersonalizedMV {
    id: number
    type: number
    name: string
    copywriter: string
    picUrl: string
    canDislike: false
    trackNumberUpdateTime: unknown
    duration: number
    playCount: number
    subed: boolean
    artists: Array<Artist>
    artistName: string
    artistId: number
    alg: string
}

export interface PrivateMV {
    id: number,
    url: string,
    picUrl: string
    sPicUrl: string
    type: number
    copywriter: string
    name: string
    alg?: string
    time?: number
}
