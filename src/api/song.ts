import request from "@/utils/request";
import {SongUrl} from "@/models/SongUrl";
import {Song, TopSong} from "@/models/Song";

export async function getSongUrl(id: number) {
    const { data } = await request.get<{ data: SongUrl[] }>('/song/url', { id, cookie: sessionStorage.getItem('cookie') })
    return data[0]
}

export async function getSong(ids: number[]) {
    const { songs } = await request.get<{ songs: Song[] }>('/song/detail', { ids: ids.join(',') })
    return songs[0]
}

export async function getTopSongs(type: number = 0) {
    const { data } = await request.get<{ data: TopSong[] }>('/top/song', { type })
    return data
}
