import {request} from "@/utils/request";
import {Song, TopSong, SongUrl} from "@/models/Song";

/**
 * 获取音乐URL
 * @param id（接口支持多个id，用','隔开，这里只提供获取一个）
 * 未登录状态或者非会员返回试听片段
 */
export async function getSongUrl(id: number) {
    return request<{ data: SongUrl[] }>('/song/url', 'GET', { id }, true).then(res => {
        return res.data[0]
    })
}

/**
 * 歌曲详情
 * @param ids（支持多个id，用','隔开）
 */
export function getSong(ids: number[]) {
    return request<{ songs: Song[] }>('/song/detail', 'GET', { ids: ids.join(',') }).then(res => {
        return res.songs
    })
}

/**
 * 最新音乐
 */
export function getTopSongs(type: number = 0) {
    return request<{ data: TopSong[] }>('/top/song', 'GET', { type }).then(res => {
        return res.data
    })
}
