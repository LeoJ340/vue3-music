export interface Category {
    name: string
    resourceCount: number
    imgId: number
    imgUrl: string | null
    type: number
    category: number
    resourceType: number
    hot: boolean
    activity: boolean
}

export interface HotCategory{
    id: number
    name: string
    type: number
    category: number
    usedCount: number
    createTime: number
    position: number
    hot: boolean
    activity: boolean
    playlistTag: {
        id: number
        name: string
        type: number
        category: number
        usedCount: number
        createTime: number
        position: number
        highQuality: number
        highQualityPos: number
        officialPos: number
    }
}

// 精选类别
export interface HighQualityTag {
    id: number
    name: string
    type: number
    category: number
    hot: boolean
}
