import {request} from "@/utils/request";
import {PlayList, TopList} from "@/models/PlayList";
import { Song } from "@/models/Song";
import {Category, HotCategory, HighQualityTag} from "@/models/Category";

/**
 * 歌单详情
 */
export function getPlayList(id: number) {
    return request<{ playlist: PlayList }>('/playlist/detail', 'GET', { id }).then(res => {
        return res.playlist
    })
}

/**
 * 获取歌单的歌曲列表
 * 歌单里存在用户自己云盘的歌曲时，请求需要用户cookie
 */
export function getPlayListTrack(id: number) {
    return request<{ songs: Array<Song> }>('/playlist/track/all', 'GET', { id }, true).then(res => {
        return res.songs
    })
}

/**
 * 排行榜（返回还包括歌手榜、赞赏榜）
 */
export function getTopList() {
    return request<{ list: TopList[] }>('/toplist/detail', 'GET', {}).then(res => {
        return res.list
    })
}

/**
 * 热门分类（推荐歌单右边展示的一排）
 */
export function getHotCategories() {
    return request<{ tags: Array<HotCategory> }>('/playlist/hot', 'GET', {}).then(res => {
        return res.tags
    })
}

/**
 * 全部分类
 */
export function getSubCategories() {
    return request<{ sub: Array<Category> }>('/playlist/catlist', 'GET', {}).then(res => {
        return res.sub
    })
}

/**
 * 精选分类
 */
export function getHighQualityCategories() {
    return request<{ tags: Array<HighQualityTag> }>('/playlist/highquality/tags', 'GET', {}).then(res => {
        return res.tags
    })
}

/**
 * 精选歌单
 */
export function getTopPlayListsByHighQualityCategories(params: {cat: string, limit: number, before?: number}) {
    params.cat = params.cat || '全部'
    params.limit = params.limit || 50
    return request<{
        playlists: Array<PlayList>,
        total: number,
        more: boolean
    }>('/top/playlist/highquality', 'GET', params).then(res => {
        return { playlists: res.playlists, total: res.total }
    })
}

/**
 * 网友精选碟歌单
 */
export function getTopPlaylistsByCategory(params: { cat: string, limit: number, page: number }) {
    const { cat = '全部', limit = 50, page = 1 } = params
    return request<{
        playlists: Array<PlayList>,
        total: number,
        more: boolean
    }>('/top/playlist', 'GET', {
        cat,
        limit,
        offset: (page - 1) * limit
    }).then(res => {
        return { playlists: res.playlists, total: res.total }
    })
}
