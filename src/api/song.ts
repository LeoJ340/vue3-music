import {request} from "@/utils/request";
import {Song, TopSong, SongUrl, RecentSong} from "@/models/Song";

/**
 * 获取音乐URL
 * @param id（接口支持多个id，用','隔开，这里只提供获取一个）
 * 未登录状态或者非会员返回试听片段
 */
export async function getSongUrl(id: number) {
    return new Promise<SongUrl>((resolve, reject) => {
        const options = {
            needLogin: true,
            data: { id }
        }
        request<{ code: number, data: SongUrl[] }>('/song/url', 'POST', options).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data[0])
            } else {
                reject()
            }
        }).catch(() => {
            reject()
        })
    })
}

/**
 * 歌曲详情
 * @param ids（支持多个id，用','隔开）
 */
export function getSong(ids: number[]) {
    return new Promise<Song[]>(resolve => {
        request<{ code: number, songs: Song[] }>('/song/detail', 'GET', { params: { ids: ids.join(',') } }).then(res => {
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
        })
    })
}

/**
 * 新歌速递
 */
export function getTopSongs(type: number = 0) {
    return new Promise<TopSong[]>((resolve, reject) => {
        request<{ code: number, data: TopSong[] }>('/top/song', 'GET', { data: { type } }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data)
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
 * 最近播放
 */
export function getRecentSongs(limit : number = 100) {
    return new Promise<{ total: number, songs: Song[] }>((resolve, reject) => {
        request<{ code: number, data: { total: number, list: RecentSong[] } }>('/record/recent/song', 'GET', { params: { limit } }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve({ total: data.total, songs: data.list.map(item => item.data) })
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
 * 喜欢&不喜欢
 */
export function likeSong(songId: number, like : boolean): Promise<void> {
    const params = {
        id: songId,
        like
    }
    return new Promise((resolve, reject) => {
        request<{ code: number }>('/like', 'POST', { data: params, needLogin: true }).then(res => {
            const { code } = res
            if (code === 200) {
                resolve()
            } else {
                ElMessage({
                    message: code === 302 ? '先登录' : '操作失败',
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
