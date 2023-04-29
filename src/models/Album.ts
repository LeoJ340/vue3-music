import {Song} from "@/models/Song";
import {Artist} from "@/models/Artist";

export interface Album {
    songs: Array<Song>
    paid: boolean
    onSale: boolean
    mark: number
    awardTags: unknown | null
    companyId: number
    blurPicUrl: string
    pic: number
    alias: Array<string>
    artists: Array<Artist>
    copyrightId: number
    picId: number
    artist: Artist
    publishTime: number
    company: string
    briefDesc: string
    picUrl: string
    commentThreadId: string
    description: string
    tags: string
    status: number
    subType: string
    name: string
    id: number
    type: string
    size: number
    picId_str: string
    info?: {
        commentThread: object
        latestLikedUsers: unknown | null
        liked: false,
        comments: unknown | null
        resourceType: number
        resourceId: number
        commentCount: number
        likedCount: number
        shareCount: number
        threadId: string
    }
    isSub: boolean
}
