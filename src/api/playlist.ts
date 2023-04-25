import {request} from "@/utils/request";
import {PlayList, TopList} from "@/models/PlayList";
import { Song } from "@/models/Song";
import {Category, HotCategory, HighQualityTag} from "@/models/Category";

/**
 * 歌单详情
 */
export function getPlayList(id: number) {
    return new Promise<PlayList>((resolve, reject) => {
        request<{ code: number, playlist: PlayList }>('/playlist/detail', 'GET', { params: { id } }).then(res => {
            const { code, playlist } = res
            if (code === 200) {
                resolve(playlist)
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
 * 获取歌单的歌曲列表
 * 歌单里存在用户自己云盘的歌曲时，请求需要用户cookie
 */
export function getPlayListTrack(id: number, page: { offset: number, limit?: number } = { offset: 0 }) {
    const params = Object.assign({ id }, page)
    return new Promise<Array<Song>>((resolve, reject) => {
        request<{ code: number, songs: Array<Song> }>('/playlist/track/all', 'POST', { data: params, needLogin: true }).then(res => {
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
            }
        }).catch(reason => {
            // 需要处理显示网络异常
            reject(reason)
        })
    })
}

/**
 * 排行榜（返回还包括歌手榜、赞赏榜）
 */
export function getTopList() {
    return new Promise<TopList[]>((resolve, reject) => {
        request<{ code: number, list: TopList[] }>('/toplist/detail', 'GET').then(res => {
            const { code, list } = res
            if (code === 200) {
                resolve(list)
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
 * 全部分类
 */
export function getSubCategories() {
    return new Promise<Array<Category>>((resolve, reject) => {
        request<{ code: number, sub: Array<Category> }>('/playlist/catlist', 'GET').then(res => {
            const { code, sub } = res
            if (code === 200) {
                resolve(sub)
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
 * 热门分类（推荐歌单右边展示的一排）
 */
export function getHotCategories() {
    return new Promise<Array<HotCategory>>((resolve, reject) => {
        request<{ code: number, tags: Array<HotCategory> }>('/playlist/hot', 'GET').then(res => {
            const { code, tags } = res
            if (code === 200) {
                resolve(tags)
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
 * 精选分类
 */
export function getHighQualityCategories() {
    return new Promise<Array<HighQualityTag>>((resolve, reject) => {
        request<{ code: number, tags: Array<HighQualityTag> }>('/playlist/highquality/tags', 'GET').then(res => {
            const { code, tags } = res
            if (code === 200) {
                resolve(tags)
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
 * 精选歌单
 */
export function getHighQualityPlayLists(params: {cat: string, limit: number, before?: number}) {
    params.cat = params.cat || '全部'
    params.limit = params.limit || 50
    return new Promise<{total: number; playlists: Array<PlayList>}>((resolve, reject) => {
        request<{
            code: number
            playlists: Array<PlayList>,
            total: number,
            more: boolean
        }>('/top/playlist/highquality', 'GET', { params }).then(res => {
            const { code, playlists, total } = res
            if (code === 200) {
                resolve({ playlists, total })
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
 * 网友精选碟歌单
 */
export function getPlaylists(params: { cat: string, limit: number, page: number }) {
    const { cat = '全部', limit = 50, page = 1 } = params
    const reqParams = {
        cat,
        limit,
        offset: (page - 1) * limit
    }
    return new Promise<{total: number; playlists: Array<PlayList>}>((resolve, reject) => {
        request<{
            code: number,
            playlists: Array<PlayList>,
            total: number,
            more: boolean,
            cat: string
        }>('/top/playlist', 'GET', { params: reqParams }).then(res => {
            const { code, playlists, total } = res
            if (code === 200) {
                resolve({ playlists, total })
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
 * 对歌单新增|删除歌曲
 */
export function managerTracks(op: 'add' | 'del', pid: number, tracks: number[]) {
    const params = {
        op,
        pid,
        tracks: tracks.join(',')
    }
    return new Promise<void>((resolve, reject) => {
        request<{ body: { code: number, message?: string } }>('/playlist/tracks', 'POST', { data: params, needLogin: true }).then(res => {
            const { code, message } = res.body
            if (code === 200) {
                resolve()
                return
            }
            if (code === 502 && message) {
                ElMessage({
                    message: message,
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
            reject()
        })
    })
}

/**
 * 创建歌单
 */
export function createPlayList(name: string, privacy: boolean = false) {
    const params = { name, privacy: privacy ? '10' : '' }
    return new Promise<number>((resolve, reject) => {
        request<{ code: number, id: number, playlist: PlayList }>('/playlist/create', 'POST', { data: params, needLogin: true }).then(res => {
            const { code, id } = res
            if (code === 200) {
                resolve(id)
            } else {
                ElMessage({
                    message: '创建失败',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        })
    })
}
