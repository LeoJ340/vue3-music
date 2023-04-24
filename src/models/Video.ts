export interface VideoGroup {
    id: number
    name: string
}

export interface Video {
    alg: string
    type: number
    title: string
    durationms: number
    creator: Array<{
        userId: number
        userName: string
    }>
    playTime: number
    coverUrl: string
    vid: string
    aliaName: any
    transName: any
    markTypes: Array<number>
    liveRoom: any
}
