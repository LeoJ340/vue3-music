import request from "@/utils/request";
import { PlayList, Tracks } from "@/models/PlayList";
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
export async function getPlayListTrack(id: number): Promise<Array<Tracks>> {
    const { songs } = await request.get<{ songs: Array<Tracks> }>('/playlist/track/all', { id, cookie: sessionStorage.getItem('cookie') })
    return songs
}
