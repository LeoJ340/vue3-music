import {request} from "@/utils/request";
import {Song, TopSong, SongUrl} from "@/models/Song";

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
export function getTopSongs(type: number = 0): Promise<TopSong[]> {
    return new Promise((resolve, reject) => {
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
