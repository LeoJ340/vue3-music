import request from "@/utils/request";
import {PlayList, TopList} from "@/models/PlayList";
import { Song } from "@/models/Song";
import { SongUrl } from "@/models/SongUrl";
import {Category, HotCategory, HighQualityTag} from "@/models/Category";

export async function getSongUrl(id: number) {
    const { data } = await request.get<{ data: SongUrl[] }>('/song/url', { id, cookie: sessionStorage.getItem('cookie') })
    return data[0]
}

export async function getPlayList(id: number) {
    const { playlist } = await request.get<{ playlist: PlayList }>('/playlist/detail', { id })
    return playlist
}

// 获取歌单的歌曲列表
export async function getPlayListTrack(id: number) {
    const { songs } = await request.get<{ songs: Array<Song> }>('/playlist/track/all', { id, cookie: sessionStorage.getItem('cookie') })
    return songs
}

export async function getSong(ids: number[]) {
    const { songs } = await request.get<{ songs: Song[] }>('/song/detail', { ids: ids.join(',') })
    return songs[0]
}

// 榜单
export async function getTopList() {
    const { list } = await request.get<{ list: TopList[] }>('/toplist/detail')
    return list
}

export async function getHotCategories() {
    const { tags } = await request.get<{ tags: Array<HotCategory> }>('/playlist/hot')
    return tags
}

export async function getSubCategories() {
    const { sub } = await request.get<{ all: Category, sub: Array<Category> }>('/playlist/catlist')
    return sub
}

export async function getHighQualityCategories() {
    const { tags } = await request.get<{ tags: Array<HighQualityTag> }>('/playlist/highquality/tags')
    return tags
}

export async function getTopPlayListsByHighQualityCategories(cat: string = '全部', limit: number = 50, before?: number) {
    const params = {
        cat,
        limit,
        before
    }
    const { playlists, total } = await request.get<{ playlists: Array<PlayList>, total: number, more: boolean }>('/top/playlist/highquality', params)
    return { playlists, total }
}

export async function getTopPlaylistsByCategory(cat: string = '全部', limit: number = 50, page: number) {
    const params = {
        cat,
        limit,
        offset: page * limit
    }
    const { playlists, total } = await request.get<{ playlists: Array<PlayList>, total: number, more: boolean }>('/top/playlist', params)
    return { playlists, total }
}
