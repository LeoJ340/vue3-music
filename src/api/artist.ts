import request from "@/utils/request";
import {Artist} from "@/models/Artist";

export async function getArtistList(page: number, limit: number, area?: number, type?: number, initial?: string | number) {
    const params = {
        offset: (page - 1) * limit,
        limit,
        area,
        type,
        initial
    }
    if (initial === '热门') {
        params.initial = -1
    }
    if (initial === '#') {
        params.initial = 0
    }
    const { artists } = await request.get<{ artists: Artist[] }>('/artist/list', params)
    return artists
}
