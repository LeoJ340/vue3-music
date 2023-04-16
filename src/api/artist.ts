import {newRequest} from "@/utils/request";
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
    return new Promise<Artist[]>((resolve, reject) => {
        newRequest<{ code: number, artists: Artist[], more: boolean }>('/artist/list', 'GET', { params: reqParams }).then(res => {
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
        newRequest<{ code: number, data: { artist: ArtistDetail } }>('/artist/detail', 'GET', { params: { id } }).then(res => {
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
interface ArtistDescRes extends ArtistDesc{
    code: number
}
export function getArtistDesc(id: number) {
    return new Promise<ArtistDesc>((resolve, reject) => {
        newRequest<ArtistDescRes>('/artist/desc', 'GET', { params: { id } }).then(res => {
            const { code, briefDesc, introduction } = res
            if (code === 200) {
                resolve({briefDesc, introduction})
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
