import request from "@/utils/request";
import {SongUrl} from "@/models/SongUrl";
import {Song} from "@/models/Song";

export async function getSongUrl(id: number) {
    const { data } = await request.get<{ data: SongUrl[] }>('/song/url', { id, cookie: sessionStorage.getItem('cookie') })
    return data[0]
}

export async function getSong(ids: number[]) {
    const { songs } = await request.get<{ songs: Song[] }>('/song/detail', { ids: ids.join(',') })
    return songs[0]
}

export async function getDailySongs() {
    const { data } = await request.get<{ data: { dailySongs: Song[] } }>('/recommend/songs', { cookie: sessionStorage.getItem('cookie') })
    return data.dailySongs
}
