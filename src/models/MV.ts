import {Artist} from "@/models/Artist";

export interface MV {
    id: number
    cover: string
    name: string
    playCount: number
    briefDesc: unknown
    desc: unknown
    artistName: string
    artistId: number
    duration: number
    mark: number
    subed: boolean
    artists: Array<Artist>
    alias?: Array<string>
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
