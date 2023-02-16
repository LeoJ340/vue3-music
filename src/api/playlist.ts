import request from "@/utils/request";
import { PlayList } from "@/models/PlayList";
import { Song } from "@/models/Song";
import { SongUrl } from "@/models/SongUrl";

export async function getSongUrl(id: number): Promise<SongUrl> {
    const { data } = await request.get<{ data: SongUrl[] }>('/song/url', { id, cookie: sessionStorage.getItem('cookie') })
    return data[0]
}

export async function getPlayList(id: number): Promise<PlayList> {
    const { playlist } = await request.get<{ playlist: PlayList }>('/playlist/detail', { id })
    return playlist
}

// 获取歌单的歌曲列表
export async function getPlayListTrack(id: number): Promise<Array<Song>> {
    const { songs } = await request.get<{ songs: Array<Song> }>('/playlist/track/all', { id, cookie: sessionStorage.getItem('cookie') })
    return songs
}

export async function getSong(ids: number[]): Promise<Song> {
    const { songs } = await request.get<{ songs: Song[] }>('/song/detail', { ids: ids.join(',') })
    return songs[0]
}
