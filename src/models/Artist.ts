export interface Artist {
    accountId: number
    albumSize: number,
    alias: Array<string>,
    briefDesc: string,
    fansCount: number,
    followed: boolean,
    id: number,
    img1v1Id: number,
    img1v1Id_str: number,
    img1v1Url: string,
    musicSize: number,
    name: string,
    picId: number,
    picId_str: number,
    picUrl: string,
    topicPerson: number,
    trans: string
}

export interface ArtistDetail {
    id: number
    cover: string
    name: string
    transNames: Array<any>
    alias: Array<string>
    identities: Array<string>
    identifyTag: unknown,
    briefDesc: string
    rank: {
        rank: 8
        type: 1
    }
    albumSize: number
    musicSize: number
    mvSize: number
}

export interface ArtistIntroduction {
    ti: string
    txt: string
}

export interface ArtistMV {
    id: number
    name: string
    status: number
    artist: Artist
    imgurl: string
    artistName: string
    imgurl16v9: string
    duration: number
    playCount: number
    publishTime: string
    subed: boolean
}
