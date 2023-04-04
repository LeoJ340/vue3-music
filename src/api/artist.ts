import {request} from "@/utils/request";
import {Artist, ArtistDesc, ArtistDetail} from "@/models/Artist";

/**
 * 歌手列表
 */
export function getArtistList(params: { page: number, limit: number, area?: number, type?: number, initial?: string | number }) {
    const reqParams = {
        offset: (params.page - 1) * params.limit,
        limit: params.limit,
        area: params.area,
        type: params.type,
        initial: params.initial
    }
    if (params.initial === '热门') {
        reqParams.initial = -1
    }
    if (params.initial === '#') {
        reqParams.initial = 0
    }
    return request<{ artists: Artist[], more: boolean }>('/artist/list', 'GET', reqParams).then(res => {
        return res.artists
    }).catch(_ => {
        return Promise.reject()
    })
}

/**
 * 歌手详情
 */
export function getArtistDetail(id: number) {
    return request<{ data: { artist: ArtistDetail } }>('/artist/detail', 'GET', { id }).then(res => {
        return res.data.artist
    })
}

/**
 * 歌手描述
 */
export function getArtistDesc(id: number) {
    return request<ArtistDesc>('/artist/desc', 'GET', { id }).then(res => {
        return res
    })
}
