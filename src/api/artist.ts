import {request} from "@/utils/request";
import {Artist, ArtistDetail, ArtistIntroduction, ArtistMV} from "@/models/Artist";
import {Album} from "@/models/Album";
import {Song} from "@/models/Song";

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
    return new Promise<{ artists: Artist[], more: boolean }>((resolve, reject) => {
        request<{ code: number, artists: Artist[], more: boolean }>('/artist/list', 'GET', { params: reqParams }).then(res => {
            const { code, artists, more } = res
            if (code === 200) {
                resolve({ artists, more })
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        }).catch(reason => {
            // 需要处理显示网络异常
            reject(reason)
        })
    })
}

/**
 * 歌手详情
 */
export function getArtistDetail(id: number) {
    return new Promise<ArtistDetail>((resolve, reject) => {
        request<{ code: number, data: { artist: ArtistDetail } }>('/artist/detail', 'GET', { params: { id } }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data.artist)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        }).catch(reason => {
            // 需要处理显示网络异常
            reject(reason)
        })
    })
}

/**
 * 歌手描述
 */
export function getArtistDesc(id: number) {
    return new Promise<ArtistIntroduction[]>((resolve, reject) => {
        request<{ code: number, introduction: ArtistIntroduction[], briefDesc: string }>('/artist/desc', 'GET', { params: { id } }).then(res => {
            const { code, introduction } = res
            if (code === 200) {
                resolve(introduction)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
                reject()
            }
        }).catch(reason => {
            // 需要处理显示网络异常
            reject(reason)
        })
    })
}

/**
 * 相似歌手
 */
export function getSimiArtists(id: number) {
    return new Promise<Artist[]>((resolve, reject) => {
        request<{ code: number, artists: Artist[] }>('/simi/artist', 'POST', { data: { id }, needLogin: true }).then(res => {
            const { code, artists } = res
            if (code === 200) {
                resolve(artists)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
                reject()
            }
        }).catch(reason => {
            // 需要处理显示网络异常
            reject(reason)
        })
    })
}

/**
 * 歌手MV
 */
export function getArtistMVs(id: number) {
    return new Promise<ArtistMV[]>((resolve, reject) => {
        request<{ code: number, mvs: ArtistMV[] }>('/artist/mv', 'GET', { params: { id } }).then(res => {
            const { code, mvs } = res
            if (code === 200) {
                resolve(mvs)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
                reject()
            }
        }).catch(reason => {
            // 需要处理显示网络异常
            reject(reason)
        })
    })
}

/**
 * 歌手专辑
 */
export function getArtistAlbums(id: number, limit: number = 30, page: number = 1) {
    const params = {
        id,
        limit,
        offset: (page -1) * limit
    }
    return new Promise<{ hotAlbums: Album[], more: boolean }>((resolve, reject) => {
        request<{ code: number, artist: Artist, hotAlbums: Album[], more: boolean }>('/artist/album', 'GET', { params }).then(res => {
            const { code, hotAlbums, more } = res
            if (code === 200) {
                resolve({ hotAlbums, more })
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
                reject()
            }
        }).catch(reason => {
            reject(reason)
        })
    })
}

/**
 * 歌手热门 50 首歌曲
 */
export function getArtistTopSongs(id: number) {
    return new Promise<Song[]>((resolve, reject) => {
        request<{ code: number, songs: Song[] }>('/artist/top/song', 'GET', { params: { id } }).then(res => {
            const { code, songs } = res
            if (code === 200) {
                resolve(songs)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
                reject()
            }
        }).catch(reason => {
            reject(reason)
        })
    })
}
